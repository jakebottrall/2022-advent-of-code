# frozen_string_literal: true

start_at  = Time.now
file_path = File.join(__dir__, 'input.txt')

def letter_to_priority(letter)
  char_code = letter.ord
  char_code >= 97 ? char_code - 96 : char_code - 38
end

File.open(file_path, 'r') do |file|
  ruck_sack_groups = file.read.split("\n").each_with_index.each_with_object([]) do |(ruck_sack, i), groups|
    groups.push([]) if (i % 3).zero?
    groups.last.push(ruck_sack)
  end

  priority = ruck_sack_groups.inject(0) do |sum, group|
    group.first.each_char do |char|
      if group[1].include?(char) && group[2].include?(char)
        sum += letter_to_priority(char)
        break
      end
    end

    sum
  end

  puts("Answer: #{priority}")
  puts("Solved in: #{(Time.now - start_at) * 1000}ms")
end
