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

    file.read.split("\n").each do |instruction|
      direction, steps = instruction.split(' ')

      steps.to_i.times do
        prev_head_position = head_position.dup

        should_move = false

        case direction
        when 'L'
          head_position[0] -= 1
          should_move = tail_position[0] - head_position[0] > 1
        when 'U'
          head_position[1] += 1
          should_move = head_position[1] - tail_position[1] > 1
        when 'R'
          head_position[0] += 1
          should_move = head_position[0] - tail_position[0] > 1
        when 'D'
          head_position[1] -= 1
          should_move = tail_position[1] - head_position[1] > 1
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
