str_split = 'John'
splitted = str_split.split("...")
a = []

if len(splitted) > 1:
    print("name: " + splitted[0] + "; describe: " + splitted[1])
    a.append(splitted[0])
    a.append(splitted[1])
if len(splitted) == 1:
    a.append(splitted[0])
    a.append("")
    print("name: " + splitted[0])

print(a[0])
print(a[1])