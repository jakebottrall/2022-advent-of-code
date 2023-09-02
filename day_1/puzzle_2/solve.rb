# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_1_puzzle_2') do
  File.open('./day_1/input.txt', 'r') do |file|
    elves = file.read.split("\n\n")

    calories = elves
               .map { |elf| elf.split("\n").sum(&:to_i) }
               .sort { |a, b| b - a }
               .take(3)
               .sum

    calories
  end
end
