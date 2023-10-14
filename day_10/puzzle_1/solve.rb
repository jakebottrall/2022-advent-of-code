# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_10_puzzle_1') do
  File.open('./day_10/input.txt', 'r') do |file|
    x = 1
    cycle_count = 0
    total_signal_strength = 0

    def cycle(value, cycle_count, total_signal_strength)
      cycle_count += 1
      total_signal_strength += value * cycle_count if ((cycle_count - 20) % 40).zero?
      [cycle_count, total_signal_strength]
    end

    file.each_line do |instruction|
      cycle_count, total_signal_strength = cycle(x, cycle_count, total_signal_strength)

      next unless instruction.start_with?('addx')

      cycle_count, total_signal_strength = cycle(x, cycle_count, total_signal_strength)

      x += instruction.split(' ')[1].to_i
    end

    total_signal_strength
  end
end
