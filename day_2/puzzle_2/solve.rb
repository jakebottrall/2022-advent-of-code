# frozen_string_literal: true

require_relative '../../benchmark/benchmark'

Benchmark.run('day_2_puzzle_2') do
  score_hash = {
    'A' => 1,
    'B' => 2,
    'C' => 3
  }.freeze

  File.open('./day_2/input.txt', 'r') do |file|
    games = file.read.split("\n")

    score = games.inject(0) do |sum, game|
      oppenent_score = score_hash[game[0]]

      case game[-1]
      when 'X'
        my_score = oppenent_score - 1
        sum += my_score.zero? ? 3 : my_score
      when 'Y'
        sum += oppenent_score
        sum += 3
      when 'Z'
        my_score = (oppenent_score + 1) % 4
        sum += my_score.zero? ? 1 : my_score
        sum += 6
      end

      sum
    end

    score
  end
end
