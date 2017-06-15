
#1c, 5c, 10c, 25c, 50c, and $1.
CHANGE_OPTIONS = [1, 0.5, 0.25, 0.1, 0.05, 0.01]

def getChange(money, price):
    change_array = [0,0,0,0,0]
    change = money - price
    change_left = change
    for index, change_option in enumerate(CHANGE_OPTIONS):
        # stop condition =
        if change_left % change_option == 0:
            change_array[index] = change_left / change_option
            return change_array
        else:
            change_array[index] = change_left / change_option
            change_left = change_left % change_option
        # max for the change option

    return change_array


print getChange(5, 0.99)
# min number of change , module %
# 5 -> 0.99
# 5 -> 1.01
# less money than price ? validation?
