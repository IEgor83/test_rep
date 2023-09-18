count, m = map(int, input().split())
prices = list(map(int, input().split()))
max_price = 0
for price in prices:
    if m > price > max_price:
        max_price = price
print (max_price)
print (type(max_price))

s = input()
d = {'s': 0, 'h': 0, 'e': 0, 'r': 0, 'i': 0, 'f': 0}
for i in s:
    if i in d:
        d[i] += 1
min_val = d['s']
for key in d:
    if min_val < d[key]:
        min_val = d[key]
if min_val*2 > d['f']:
    min_val = d['f'] // 2
print(min_val)

n = int(input())
djo_list = list(map(int, input().split()))
win_list = list(map(int, input().split()))
l = 0
r = n - 1
flag = 0
while flag < 2:
    flag = 0
    if djo_list[l]==win_list[l]:
        l += 1
    else:
        flag += 1
    if djo_list[r]==win_list[r]:
        r -= 1
    else:
        flag += 1
djo_list[l:r] = sorted(djo_list[l:r])