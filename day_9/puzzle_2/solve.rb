# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_9_puzzle_2') do
  File.open('./day_9/input.txt', 'r') do |file|
    rope_length = 10
    rope        = Array.new(rope_length) { [0, 0] }

    tail_position_history = Set.new([0])

    def cantor_pairing(x_coord, y_coord)
      x_adj = x_coord >= 0 ? 2 * x_coord : -2 * x_coord - 1
      y_adj = y_coord >= 0 ? 2 * y_coord : -2 * y_coord - 1
      ((x_adj + y_adj) * (x_adj + y_adj + 1)) / 2 + y_adj
    end

    direction_mapping = {
      'L' => [-1, 0],
      'U' => [0, 1],
      'R' => [1, 0],
      'D' => [0, -1]
    }

    file.each_line do |instruction|
      direction, steps = instruction.split(' ')

      dx, dy = direction_mapping[direction]

      steps.to_i.times do
        rope[0][0] += dx
        rope[0][1] += dy

        (1..rope_length - 1).each do |i|
          dy_diff = rope[i - 1][0] - rope[i][0]
          dx_diff = rope[i - 1][1] - rope[i][1]

          break unless [dy_diff.abs, dx_diff.abs].max > 1

          rope[i][0] += dy_diff <=> 0 unless dy_diff.zero?
          rope[i][1] += dx_diff <=> 0 unless dx_diff.zero?

          tail_position_history.add(cantor_pairing(*rope[i])) if i == rope_length - 1
        end
      end
    end

    tail_position_history.size
  end
end
