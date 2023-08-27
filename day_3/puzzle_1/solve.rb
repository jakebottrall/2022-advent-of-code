# frozen_string_literal: true

start_at      = Time.now
file_path     = File.join(__dir__, 'input.txt')

def letter_to_priority(letter)
  char_code = letter.ord
  char_code >= 97 ? char_code - 96 : char_code - 38
end

File.open(file_path, 'r') do |file|
  ruck_sacks = file.read.split("\n")

  priority = ruck_sacks.inject(0) do |sum, ruck_sack|
    compartment_size  = ruck_sack.length / 2

    compartment_one   = ruck_sack.slice(0, compartment_size)
    compartment_two   = ruck_sack.slice(compartment_size, ruck_sack.length)

    compartment_one.each_char do |char|
      if compartment_two.include?(char)
        sum += letter_to_priority(char)
        break
      end
    end

    sum
  end

  puts("Answer: #{priority}")
  puts("Solved in: #{(Time.now - start_at) * 1000}ms")
end
