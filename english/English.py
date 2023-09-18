import re
reg = re.compile('[^a-zA-Z ]')

f = open('the_third_form.txt', 'r')
verbs = f.read()


def first_form():
    if 'am' in sentence_list:
        ind = sentence_list.index('am')
    elif 'is' in sentence_list:
        ind = sentence_list.index('is')
    elif 'are' in sentence_list:
        ind = sentence_list.index('are')
    else:
        return second_form()
    for i in range(ind+1, len(sentence_list)):
        if sentence_list[i].endswith('ing'):
            if sentence_list[i] == 'being' and ((reg.sub('', sentence_list[i+1])).endswith('ed') or
                                                (reg.sub('', sentence_list[i+1])) in verbs):
                return 'Passive voice, Present Continuous \n'
            else:
                return 'Active voice, Present Continuous \n'
        elif (reg.sub('', sentence_list[i])).endswith('ed') or (reg.sub('', sentence_list[i])) in verbs:
            return 'Passive voice, Present Simple \n'
    else:
        return 'Active voice, Present Continuous \n'


def second_form():
    if 'were' in sentence_list:
        ind = sentence_list.index('were')
    elif 'was' in sentence_list:
        ind = sentence_list.index('was')
    else:
        return third_form()
    for i in range(ind+1, len(sentence_list)):
        if sentence_list[i].endswith('ing'):
            if sentence_list[i] == 'being' and (sentence_list[i+1].endswith('ed') or sentence_list[i+1] in verbs):
                return 'Passive voice, Past Continuous \n'
            else:
                return 'Active voice, Past Continuous \n'
        elif (reg.sub('', sentence_list[i])).endswith('ed') or (reg.sub('', sentence_list[i])) in verbs:
            return 'Passive voice, Past Simple \n'
    else:
        return 'Active voice \n'


def third_form():
    if 'has' in sentence_list:
        ind = sentence_list.index('has')
        flag = 0
    elif 'have' in sentence_list:
        ind = sentence_list.index('have')
        flag = 0
    elif 'had' in sentence_list:
        ind = sentence_list.index('had')
        flag = 1
    else:
        return fourth_form()
    for i in range(ind+1, len(sentence_list)):
        if sentence_list[i] == 'been':
            if (reg.sub('', sentence_list[i+1])).endswith('ed') or (reg.sub('', sentence_list[i+1])) in verbs:
                if flag:
                    return 'Passive voice, Past Perfect \n'
                else:
                    return 'Passive voice, Present Perfect \n'
            else:
                if 'had' in sentence_list:
                    if reg.sub('', sentence_list[i + 1]).endswith('ing'):
                        return 'Active voice, Past Perfect Continuous \n'
                    else:
                        return 'Active voice, Past Perfect \n'
                else:
                    if reg.sub('', sentence_list[i+1]).endswith('ing'):
                        return 'Active voice, Present Perfect Continuous \n'
                    else:
                        return 'Active voice, Present Perfect \n'
    else:
        return 'Active voice \n'


def fourth_form():
    if 'will' in sentence_list:
        ind = sentence_list.index('will')
        if sentence_list[ind+1] == 'have':
            ind += 1
    else:
        return 'Active voice'
    for i in range(ind+1, len(sentence_list)):
        if sentence_list[i] == 'be':
            if (reg.sub('', sentence_list[i+1])).endswith('ed') or (reg.sub('', sentence_list[i+1])) in verbs:
                return 'Passive voice, Future Simple \n'
            else:
                return 'Active voice \n'
        elif sentence_list[i] == 'been':
            if (reg.sub('', sentence_list[i+1])).endswith('ed') or (reg.sub('', sentence_list[i+1])) in verbs:
                return 'Passive voice, Future Perfect \n'
            else:
                return 'Active voice, Future Perfect Continuous \n'
    else:
        return 'Active voice \n'


def examples():
    if tense == 'present simple':
        first = 'Thousands of dollars are spent on coffee in America every day.'
        second = 'My project for English literature is ruined!'
        third = 'I am not invited to a party.'
        return first, second, third, ''
    elif tense == 'past simple':
        first = 'The radio was invented 150 years ago.'
        second = 'The ceremony was not performed in the chapel.'
        third = 'The chairs were brought to the classroom.'
        return first, second, third, ''
    elif tense == 'future simple':
        first = 'The letter will be sent tomorrow.'
        second = 'A house will be provided for you.'
        third = 'He will not be forgotten by him.'
        return first, second, third, ''
    elif tense == 'present continuous':
        first = 'The car is being refueled now.'
        second = 'You are being photographed with a professional camera.'
        third = 'I am being hugged by my aunt.'
        return first, second, third, ''
    elif tense == 'past continuous':
        first = 'The exam was being taken yesterday morning.'
        second = 'The movies were being watched by children.'
        third = 'The conference was being conducted for 3 hours.'
        return first, second, third, ''
    elif tense == 'present perfect':
        first = 'The flowers have already been watered.'
        second = 'His letter has been sent to the wrong address.'
        third = 'My sister has been given many sweets.'
        return first, second, third, ''
    elif tense == 'past perfect':
        first = 'The police had been called before the burglars ran away.'
        second = 'When I came home, the door had already been painted.'
        third = 'When she took the train, her suitcase had already been stolen.'
        return first, second, third, ''
    elif tense == 'future perfect':
        first = 'The article will have been rewritten by tomorrow morning.'
        second = 'The car will have been repaired by Tuesday'
        third = 'The products will have been bought by evening'
        return first, second, third, ''
    else:
        return 'nothing', ''


while True:
    print('Determine the time - 1')
    print('Example of Passive voice - 2')
    print('action: ', end='')
    action = int(input())
    if action == 1:
        print('Please enter a suggestion:')
        sentence = input()
        sentence_list = sentence.lower().split()
        print(first_form())
    else:
        print('Please enter the tense')
        tense = input()
        tense = tense.lower()
        for example in examples():
            print(example)
