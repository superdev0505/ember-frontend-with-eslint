#!/usr/bin/ruby

# Ruby script to check code coverage.
# Parses the output of COVERAGE=true ember test
# Throws an error if below a threshold
# Used in Codeship CI pipeline

# Threshold for an error (percent lines covered)
cov_required = 75

cov_file = open("coverage/coverage-summary.json")

json = cov_file.read

require 'json'

cov = JSON.parse(json)

# There is lots of data here - we just use the percent of total lines covered
lines_covered = cov["total"]["lines"]["pct"].to_f
puts "CODE COVERAGE: LINES COVERED #{cov["total"]["lines"]["covered"]}/#{cov["total"]["lines"]["total"]} (#{lines_covered}%)"
puts "Required coverage: #{cov_required}%"
# puts "Full coverage data:"
# puts cov

# Print all files with < 100% code coverage
puts "Files with < 100% coverage:"
cov.keys.each do |key|
  next if key == "total"
  pct = cov[key]["lines"]["pct"]
  if pct < 100
    puts "#{key} : #{pct}% covered"
  end
end


if lines_covered.to_f < cov_required.to_f
  raise "COVERAGE CHECK FAILED: Insufficient code coverage"
else
  puts "COVERAGE CHECK PASSED"
end
