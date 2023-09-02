# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_5_puzzle_1') do
  File.open('./day_5/input.txt', 'r') do |file|
    stacks, instructions = file.read.split("\n\n")

    stack_lines = stacks.split("\n").reverse

    stack_grid = stack_lines.each_with_index.each_with_object(Array.new(9) { [] }) do |(row, i), grid|
      next if i.zero?

      row.split('').each_with_index do |char, j|
        next if char == ' '
        next if (j - 1) % 4 != 0

        position = (j - 1) / 4

        grid[position].push(char)
      end
    end

    instructions.gsub(/\b(move |from |to )\b/, '').split("\n").each do |instruction|
      move, from, to = instruction.split(' ').map(&:to_i)

      move.times do
        crate = stack_grid[from - 1].pop
        stack_grid[to - 1].push(crate)
      end
    end

    top_crates = stack_grid.inject('') { |string, col| "#{string}#{col.last}" }

    top_crates
  end
end
