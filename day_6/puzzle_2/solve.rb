# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_6_puzzle_2') do
  File.open('./day_6/input.txt', 'r') do |file|
    packet_stream = file.read

    start_of_packet_marker = -1

    packet_stream.length.times do |i|
      packet  = packet_stream[i..i + 13]
      checked = []

      packet.each_char do |value|
        break if checked.include?(value)

        checked.push(value)
      end

      if checked.length == 14
        start_of_packet_marker = i + 14
        break
      end
    end

    start_of_packet_marker
  end
end
