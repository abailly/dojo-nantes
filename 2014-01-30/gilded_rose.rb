require './item.rb'

class GildedRose

  @items = []
  @items_original = []

  def initialize
    @items = []
    @items << Item.new("+5 Dexterity Vest", 10, 20)
    @items << Item.new("Aged Brie", 2, 0)
    @items << Item.new("Elixir of the Mongoose", 5, 7)
    @items << Item.new("Sulfuras, Hand of Ragnaros", 0, 80)
    @items << Item.new("Backstage passes to a TAFKAL80ETC concert", 15, 20)
    @items << Item.new("Conjured Mana Cake", 3, 6)
    @items_original = @items.map { |item| item.clone }

  end

  def items
    @items
  end

  def items_original
    @items_original
  end

  def update_quality

    items = @items

    for i in 0..(items.size-1)
      item = items[i]
      next if (item.name == "Sulfuras, Hand of Ragnaros")

      if item.name == "Aged Brie"
        if (item.quality < 50)
          item.quality = item.quality + 1
        end
      elsif item.name == "Backstage passes to a TAFKAL80ETC concert"
        if (item.quality < 50)
          item.quality = item.quality + 1
          if (item.sell_in < 11 && item.quality < 50)
            item.quality = item.quality + 1
          end
          if (item.sell_in < 6 && item.quality < 50)
            item.quality = item.quality + 1
          end
        end
      elsif (item.quality > 0)
        item.quality = item.quality - 1
      end

      item.sell_in = item.sell_in - 1;

      if (item.sell_in < 0)
        if (item.name != "Aged Brie")
          if ((item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert"))
            if (item.quality > 0)
              item.quality = item.quality - 1
            end
          else
            item.quality = 0
          end
        else
          if (item.quality < 50)
            item.quality = item.quality + 1
          end
        end
      end
    end
  end


  def update_quality_original

    items = @items_original
    for i in 0..(items.size-1)
      if (items[i].name != "Aged Brie" && items[i].name != "Backstage passes to a TAFKAL80ETC concert")
        if (items[i].quality > 0)
          if (items[i].name != "Sulfuras, Hand of Ragnaros")
            items[i].quality = items[i].quality - 1
          end
        end
      else
        if (items[i].quality < 50)
          items[i].quality = items[i].quality + 1
          if (items[i].name == "Backstage passes to a TAFKAL80ETC concert")
            if (items[i].sell_in < 11)
              if (items[i].quality < 50)
                items[i].quality = items[i].quality + 1
              end
            end
            if (items[i].sell_in < 6)
              if (items[i].quality < 50)
                items[i].quality = items[i].quality + 1
              end
            end
          end
        end
      end
      if (items[i].name != "Sulfuras, Hand of Ragnaros")
        items[i].sell_in = items[i].sell_in - 1;
      end
      if (items[i].sell_in < 0)
        if (items[i].name != "Aged Brie")
          if (items[i].name != "Backstage passes to a TAFKAL80ETC concert")
            if (items[i].quality > 0)
              if (items[i].name != "Sulfuras, Hand of Ragnaros")
                items[i].quality = items[i].quality - 1
              end
            end
          else
            items[i].quality = items[i].quality - items[i].quality
          end
        else
          if (items[i].quality < 50)
            items[i].quality = items[i].quality + 1
          end
        end
      end
    end
  end

end