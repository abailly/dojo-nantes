require './gilded_rose.rb'
require "rspec"

describe GildedRose do

  def compare_items
    result = subject.items_original.zip (subject.items)
    result.each do |x|
      x[0].quality.should == x[1].quality
      x[0].name.should == x[1].name
      x[0].sell_in.should == x[1].sell_in
    end
  end

  it "maintains two lists" do
    compare_items
  end

  it "deeply clone items" do
    subject.items[0].quality -= 1
    subject.items_original[0].quality.should_not eq(subject.items[0].quality)
  end

  it "update_quality " do
    1000.times do
      subject.update_quality
      subject.update_quality_original
      compare_items
    end
  end


end