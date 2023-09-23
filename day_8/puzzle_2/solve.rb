# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_8_puzzle_2') do
  File.open('./day_8/input.txt', 'r') do |file|
    rows = file.read.split("\n").map { |row| row.split('').map(&:to_i) }
    cols = rows[0].map.with_index { |_, col| rows.map { |row| row[col] } }

    max_length = [rows.length, cols.length].max

    def score_direction(tree, following_trees)
      score = 0

      following_trees.each do |following_tree|
        score += 1

        break if tree <= following_tree
      end

      score
    end

    max_score = 0

    max_length.times do |i|
      next if i.zero?
      next if i == max_length - 2

      row = rows[i]

      max_length.times do |j|
        tree = row[j]

        score =
          score_direction(tree, row[j + 1..]) *
          score_direction(tree, row[0...j].reverse) *
          score_direction(tree, cols[j][i + 1..]) *
          score_direction(tree, cols[j][0...i].reverse)

        max_score = [score, max_score].max
      end
    end

    max_score
  end
end
