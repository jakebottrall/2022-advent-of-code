# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run do
  file_path = File.join(__dir__, 'input.txt')

  File.open(file_path, 'r') do |file|
    pairs = file.read.split("\n")

    count = pairs.count do |pair|
      start_a, end_a, start_b, end_b = pair.split(/[, -]/).map(&:to_i)

      if start_a <= end_b && end_a >= start_b
        true
      else
        false
      end
    end

    count
  end
end
