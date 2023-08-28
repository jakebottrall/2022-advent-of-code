# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run do
  file_path = File.join(__dir__, 'input.txt')

  File.open(file_path, 'r') do |file|
    elves = file.read.split("\n\n")

    calories = elves
               .map { |elf| elf.split("\n").sum(&:to_i) }
               .sort { |a, b| b - a }
               .take(3)
               .sum

    calories
  end
end
