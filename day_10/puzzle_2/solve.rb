# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_10_puzzle_2') do
  File.open('./day_10/input.txt', 'r') do |file|
    x = 1
    cycle_count = 0
    crt = Array.new(6, '')

    def cycle(value, cycle_count, crt)
      cycle_count += 1

      row = (cycle_count - 1) / 40

      crt[row] = if (((cycle_count - 1) % 40) - value).abs <= 1
                   "#{crt[row]}#"
                 else
                   "#{crt[row]}."
                 end

      [cycle_count, crt]
    end

    file.each_line do |instruction|
      cycle_count, crt = cycle(x, cycle_count, crt)

      next unless instruction.start_with?('addx')

      cycle_count, crt = cycle(x, cycle_count, crt)

      x += instruction.split(' ')[1].to_i
    end

    "\n#{crt.join("\n")}"
  end
end
