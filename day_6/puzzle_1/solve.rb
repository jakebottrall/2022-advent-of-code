# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run do
  file_path = File.join(__dir__, 'input.txt')

  File.open(file_path, 'r') do |file|
    packet_stream = file.read

    start_of_packet_marker = -1

    packet_stream.length.times do |i|
      packet  = packet_stream[i..i + 3]
      checked = []

      packet.each_char do |value|
        break if checked.include?(value)

        checked.push(value)
      end

      if checked.length == 4
        start_of_packet_marker = i + 4
        break
      end
    end

    start_of_packet_marker
  end
end
