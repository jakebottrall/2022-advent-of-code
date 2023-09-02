# frozen_string_literal: true

require 'json'

module Benchmark
  ITERATIONS = 10_000

  def self.run(key)
    run_times = []

    answer = 0

    ITERATIONS.times do
      start_at = Time.now
      answer = yield
      end_at = Time.now
      run_times.push((end_at - start_at) * 1000)
    end

    run_times.sort!

    total = run_times.sum
    average = total / ITERATIONS.to_f
    median = run_times[ITERATIONS / 2]
    p95 = run_times[(ITERATIONS * 0.95).to_i]
    p99 = run_times[(ITERATIONS * 0.99).to_i]

    results = {
      answer: answer,
      total: parse_result(total),
      average: parse_result(average),
      median: parse_result(median),
      p95: parse_result(p95),
      p99: parse_result(p99)
    }

    puts(results)

    File.open("./results/#{key}_rb.json", 'w') do |file|
      file.write(JSON.generate(results))
    end
  end

  def self.parse_result(result)
    "#{format('%.5f', result)}ms"
  end
end
