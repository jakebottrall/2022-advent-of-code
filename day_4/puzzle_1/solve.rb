# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_4_puzzle_1') do
  File.open('./day_4/input.txt', 'r') do |file|
    pairs = file.read.split("\n")

    count = pairs.count do |pair|
      start_a, end_a, start_b, end_b = pair.split(/[, -]/).map(&:to_i)

      if start_a <= start_b && end_a >= end_b
        true
      elsif start_b <= start_a && end_b >= end_a
        true
      else
        false
      end
    end

    count
  end
end
