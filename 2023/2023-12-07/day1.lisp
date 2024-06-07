(defparameter *test*
  '("1abc2"
    "pqr3stu8vwx"
    "a1b2c3d4e5f"
    "treb7uchet"))

(defun find-digit (s)
  (digit-char-p (find-if #'digit-char-p s)))

(defun calibration-line (string)
  (let ((first-digit (find-digit string))
        (second-digit (find-digit (reverse string))))
    (+ (* 10 first-digit)
       second-digit)))

(defun calibration (strings)
  (apply #'+
         (mapcar #'calibration-line strings)))

;; high-level test
(let ((expected 142)
      (actual (calibration *test*) ))
  (if (= expected actual)
      (print 'ok)
      (format t "ko: ~a != ~a~%" actual expected)))

;; test calibration sur une seule ligne
(let ((expected 12)
      (actual (calibration-line (car *test*))))
  (if (= expected actual)
      (print 'ok)
      (format t "ko: ~a != ~a~%" actual expected)))
