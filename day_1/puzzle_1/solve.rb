# frozen_string_literal: true

start_at      = Time.now
file_path     = File.join(__dir__, 'input.txt')

File.open(file_path, 'r') do |file|
  elves = file.read.split("\n\n")

  calories = elves
             .map { |elf| elf.split("\n").sum(&:to_i) }
             .min { |a, b| b - a }

  puts("Answer: #{calories}")
  puts("Solved in: #{(Time.now - start_at) * 1000}ms")
end
