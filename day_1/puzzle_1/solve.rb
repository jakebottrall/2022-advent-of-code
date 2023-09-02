# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_1_puzzle_1') do
  File.open('./day_1/input.txt', 'r') do |file|
    elves = file.read.split("\n\n")

    calories = elves
               .map { |elf| elf.split("\n").sum(&:to_i) }
               .min { |a, b| b - a }

    calories
  end
end
