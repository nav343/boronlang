def add(num1, *args):
    total = num1
    for num in args:
        total += num
    return total

def sub(num1, *args):
    total = num1
    for num in args:
        total -= num
    return total
    
def mul(num1, *args):
    total = num1
    for num in args:
        total *= num
    return total
    
def div(num1, *args):
    total = num1
    for num in args:
        total /= num
    return total

def mod(a, b):
  return a % b
for i in "23543":
      print(i)
    print("HI")