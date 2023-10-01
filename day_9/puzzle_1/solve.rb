# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_9_puzzle_1') do
  File.open('./day_9/input.txt', 'r') do |file|
    head_position = [0, 0]
    tail_position = [0, 0]

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
        prev_head_position = head_position.dup

        head_position[0] += dx
        head_position[1] += dy

        should_move = false

        if %w[L R].include?(direction)
          should_move = (tail_position[0] - head_position[0]).abs > 1
        elsif %w[U D].include?(direction)
          should_move = (tail_position[1] - head_position[1]).abs > 1
        end

        if should_move
          tail_position = prev_head_position
          tail_position_history.add(cantor_pairing(*tail_position))
        end
      end
    end

    tail_position_history.size
  end
end
