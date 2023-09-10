# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_8_puzzle_1') do
  File.open('./day_8/input.txt', 'r') do |file|
    rows = file.read.split("\n").map { |row| row.split('').map(&:to_i) }
    cols = rows[0].map.with_index { |_, col| rows.map { |row| row[col] } }

    max_length = [rows.length, cols.length].max

    visible_trees = Set.new

    max_length.times do |i|
      row = rows[i]
      col = cols[i]

      tallest_tree_a = -1
      tallest_tree_b = -1
      tallest_tree_c = -1
      tallest_tree_d = -1

      max_length.times do |j|
        break if tallest_tree_a == 9 && tallest_tree_b == 9 && tallest_tree_c == 9 && tallest_tree_d == 9

        tree_a = row[j]
        tree_b = row[-1 - j]
        tree_c = col[j]
        tree_d = col[-1 - j]

        if tree_a > tallest_tree_a
          tallest_tree_a = tree_a
          visible_trees.add("#{i}-#{j}")
        end

        if tree_b > tallest_tree_b
          tallest_tree_b = tree_b
          visible_trees.add("#{i}-#{row.length - 1 - j}")
        end

        if tree_c > tallest_tree_c
          tallest_tree_c = tree_c
          visible_trees.add("#{j}-#{i}")
        end

        if tree_d > tallest_tree_d
          tallest_tree_d = tree_d
          visible_trees.add("#{col.length - 1 - j}-#{i}")
        end
      end
    end

    visible_trees.length
  end
end
