# frozen_string_literal: true

start_at      = Time.now
file_path     = File.join(__dir__, 'input.txt')

SCORE_HASH = {
  'A' => 1,
  'B' => 2,
  'C' => 3
}.freeze

File.open(file_path, 'r') do |file|
  games = file.read.split("\n")

  score = games.inject(0) do |sum, game|
    oppenent_score = SCORE_HASH[game[0]]

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

  end_at = Time.now

  puts("Answer: #{score}")
  puts("Solved in: #{(end_at - start_at) * 1000}ms")
end
