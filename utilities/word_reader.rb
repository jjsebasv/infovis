require 'json'

file = File.open('./definitions.txt', 'r')

def sanitize_word(word)
  word.gsub(/[^0-9A-Za-z]/, '').downcase
end
ans = {}

file.each_line do |line|
  array_line = line.split(' ')
  array_line.each do |word|
    sanitized_word = sanitize_word(word)
    if sanitized_word.length > 3
      if ans.key?(sanitized_word)
        ans[sanitized_word] += 1
      else
        ans[sanitized_word] = 1
      end
    end
  end
end

h_ans = []
min = 100
max = 0

ans.each do |key, value|
  if value > 2
    if value < min
      min = value
    end
    if value > max
      max = value
    end
    aux = {
      word: key,
      quantity: value
    }
    h_ans << aux
  end
end

puts min
puts max

File.open('./result.js', 'w+').write(JSON.generate(h_ans))