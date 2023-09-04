# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_7_puzzle_2') do
  File.open('./day_7/input.txt', 'r') do |file|
    directories = {}
    cwd = []

    file.read.split('$ ').each do |prompt|
      lines = prompt.split("\n")
      next unless lines.length.positive?

      command, *output = lines

      if command.start_with?('cd')
        next_dir = command.gsub('cd ', '')

        if next_dir == '..'
          cwd.pop
        else
          cwd.push(next_dir)
        end
      end

      next unless command.start_with?('ls')

      output.each do |dir_or_file|
        value, = dir_or_file.split(' ')

        next if ['dir', ''].include?(value)

        path = ''

        cwd.each do |dir|
          path += dir
          directories[path] = directories[path].to_i + value.to_i
        end
      end
    end

    root_dir_size = directories['/']
    required_space = 30_000_000 - (70_000_000 - root_dir_size)

    directory_to_be_removed_size = directories.values.reduce(root_dir_size) do |selected_size, size|
      size > required_space && size < selected_size ? size : selected_size
    end

    directory_to_be_removed_size
  end
end
