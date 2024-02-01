;; chatGPT nous donne ça ....
;; (defstruct node
;;   (x 0 :type fixnum)
;;   (y 0 :type fixnum)
;;   (g 0 :type fixnum)
;;   (h 0 :type fixnum)
;;   (parent nil))

;; (defun manhattan-distance (node1 node2)
;;   (+ (abs (- (node-x node1) (node-x node2)))
;;      (abs (- (node-y node1) (node-y node2)))))

;; (defun generate-successors (current-node)
;;   (list (make-node :x (1+ (node-x current-node)) :y (node-y current-node))
;;         (make-node :x (1- (node-x current-node)) :y (node-y current-node))
;;         (make-node :x (node-x current-node) :y (1+ (node-y current-node)))
;;         (make-node :x (node-x current-node) :y (1- (node-y current-node)))))

;; (defun a-star (start-node goal-node)
;;   (let* ((open-set (list start-node))
;;          (closed-set '())
;;          (came-from (make-hash-table))
;;          (g-scores (make-hash-table))
;;          (f-scores (make-hash-table)))
;;     (setf (gethash start-node g-scores) 0)
;;     (setf (gethash start-node f-scores) (manhattan-distance start-node goal-node))

;;     (labels ((get-lowest-f-score-node (open-set)
;;                (reduce (lambda (node1 node2)
;;                          (if (< (gethash node1 f-scores) (gethash node2 f-scores))
;;                              node1
;;                              node2))
;;                        open-set
;;                        :key #'(lambda (node) (gethash node f-scores))))
;;              (reconstruct-path (current-node)
;;                (if (gethash current-node came-from)
;;                    (append (reconstruct-path (gethash current-node came-from))
;;                            (list current-node))
;;                    (list current-node))))

;;       (loop while open-set do
;;            (let* ((current-node (get-lowest-f-score-node open-set))
;;                   (current-node-g-score (gethash current-node g-scores)))
;;              (if (equal current-node goal-node)
;;                  (return-from a-star (reconstruct-path current-node)))

;;              (setf open-set (remove current-node open-set))
;;              (push current-node closed-set)

;;              (dolist (neighbor (generate-successors current-node))
;;                (if (member neighbor closed-set)
;;                    (continue))

;;                (let* ((tentative-g-score (+ current-node-g-score 1))
;;                       (neighbor-g-score (or (gethash neighbor g-scores) most-positive-fixnum)))
;;                  (if (< tentative-g-score neighbor-g-score)
;;                      (progn
;;                        (setf (gethash neighbor came-from) current-node)
;;                        (setf (gethash neighbor g-scores) tentative-g-score)
;;                        (setf (gethash neighbor f-scores)
;;                              (+ tentative-g-score (manhattan-distance neighbor goal-node)))
;;                        (unless (member neighbor open-set)
;;                          (push neighbor open-set)))))))))))

;; c'est une variation de trouver le plus court chemin dans un graphe
;; -> https://en.wikipedia.org/wiki/A*_search_algorithm
;; -> https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm ?
;; comment faire en TDD?
;; le plan:
;; * on peut partir du principe qu'on a le graphe
;; * c'est pas forcément super intéressant de parser les données

(defparameter *test*
  '(( 2 4 1 3 4 3 2 3 1 1 3 2 3 )
    ( 3 2 1 5 4 5 3 5 3 5 6 2 3 )
    ( 3 2 5 5 2 4 5 6 5 4 2 5 4 )
    ( 3 4 4 6 5 8 5 8 4 5 4 5 2 )
    ( 4 5 4 6 6 5 7 8 6 7 5 3 6 )
    ( 1 4 3 8 5 9 8 7 9 8 4 5 4 )
    ( 4 4 5 7 8 7 6 9 8 7 7 6 6 )
    ( 3 6 3 7 8 7 7 9 7 9 6 5 3 )
    ( 4 6 5 4 9 6 7 9 8 6 8 8 7 )
    ( 4 5 6 4 6 7 9 9 8 6 4 5 3 )
    ( 1 2 2 4 6 8 6 8 6 5 5 6 3 )
    ( 2 5 4 6 5 4 8 8 8 7 7 3 5 )
    ( 4 3 2 2 6 7 4 6 5 5 5 3 3 )))

;; transformer ce tableau en graphe ?

;; au lieu d'encoder le graphe directement, on l'encode sous
;; la forme de fonctions

(defun out-of-bounds (graph node)
  (or (< (node-col node) 0)
      (> (node-col node)
         (1- (length (car graph))))
      (< (node-row node) 0)
      (> (node-row node)
         (1- (length graph)))))

(defstruct node
  row
  col)

(defmacro node! (x y)
  `(make-node :row ,x :col ,y))

(defun eq-node (n1 n2)
  (and (= (node-row n1) (node-row n2))
       (= (node-col n1) (node-col n2))))

(defun east-neighbour (node)
  (make-node :row (node-row node)
             :col (1+ (node-col node))))

(defun west-neighbour (node)
  (make-node :row (node-row node)
             :col (1- (node-col node))))

(defun south-neighbour (node)
  (make-node :row (1+ (node-row node))
             :col (node-col node)))

(defun north-neighbour (node)
  (make-node :row (1- (node-row node))
             :col (node-col node)))

(defun in-path (path node)
  (find-if (lambda (n) (eq-node n node)) path))

(defun neighbours (graph path node)
  (let* ((is-invalid-neighbour
           (lambda (node)
             (or
              (out-of-bounds graph node)
              (and (not (null path))
                   (in-path path node))))))

    (remove-if is-invalid-neighbour
               (list
                (west-neighbour node)
                (east-neighbour node)
                (south-neighbour node)
                (north-neighbour node)))))

(defun weight (graph node)
  (let ((row (nth (node-row node) graph)))
    (nth (node-col node) row)))

(defun minimum (list)
  (if (null list)
      0
      (apply #'min list)))

(defun lightest-path (graph path src dest)
  (cond
    ((eq-node src dest)
     (progn
       (weight graph dest)))
    (t
     (let* ((lightest-path-from
              (lambda (node)
                (lightest-path graph (cons src path) node dest)))
            (lightest-subpaths
              (mapcar lightest-path-from (neighbours graph path src)))
            (res
              (+ (weight graph src)
                 (minimum lightest-subpaths))
              ))
       (progn
         res)))))

;; high-level tests
(defmacro assert-equal! (actual expected)
  `(if (= ,expected ,actual)
       (format t "ok~%")
       (format t "ko: (actual) ~a != (expected) ~a~%" ,actual ,expected)))

(let ((expected 7)
      (actual (lightest-path '((2 5))
                             ()
                             (node! 0 0)
                             (node! 0 1))))
  (assert-equal! actual expected))

(let ((expected 8)
      (actual (lightest-path '((2 1 5)) ()
                             (node! 0 0)
                             (node! 0 2))))
  (assert-equal! actual expected))

(let ((expected 6)
      (actual (lightest-path '((2 1)
                               (1 3)) ()
                               (node! 0 0)
                               (node! 1 1))))
  (assert-equal! actual expected))

(let ((expected 9)
      (actual (lightest-path '((3 1)
                               (1 3)
                               (5 2)) ()
                               (node! 0 0)
                               (node! 2 1))))
  (assert-equal! actual expected))
