# frozen_string_literal: true

start_at      = Time.now
file_path     = File.join(__dir__, 'input.txt')

PLAY_HASH = {
  'A' => { choice: :rock, beats: :scissors, score: 1 },
  'B' => { choice: :paper, beats: :rock, score: 2 },
  'C' => { choice: :scissors, beats: :paper, score: 3 },
  'X' => { choice: :rock, beats: :scissors, score: 1 },
  'Y' => { choice: :paper, beats: :rock, score: 2 },
  'Z' => { choice: :scissors, beats: :paper, score: 3 }
}.freeze

File.open(file_path, 'r') do |file|
  games = file.read.split("\n")

  score = games.inject(0) do |sum, game|
    oppenent_play = PLAY_HASH[game[0]]
    my_play       = PLAY_HASH[game[-1]]

    sum += my_play[:score]

    if my_play[:choice] == oppenent_play[:choice]
      sum += 3
    elsif my_play[:beats] == oppenent_play[:choice]
      sum += 6
    end

    sum
  end

  puts("Answer: #{score}")
  puts("Solved in: #{(Time.now - start_at) * 1000}ms")
end
