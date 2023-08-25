# frozen_string_literal: true

start_at      = Time.now
file_path     = File.join(__dir__, 'input.txt')

File.open(file_path, 'r') do |file|
  elves = file.read.split("\n\n")
  calories = elves.map { |elf| elf.split("\n").inject(0) { |sum, cal| sum + cal.to_i } }
  sorted_calories = calories.sort { |a, b| b - a }

  puts("Answer: #{sorted_calories.first}")
  puts("Solved in: #{(Time.now - start_at) * 1000}ms")
end
