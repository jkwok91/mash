import random
import math

def inputChoices():
  mash = {'live':['mansion','apartment','street','house']} #defaults
  category = raw_input('Enter a category (press Enter when finished): ')
  while category != '':
    if not category in mash:
       mash[category] = []
    choice = raw_input('Enter a corresponding choice (press Enter when finished): ')
    while choice != '':
       mash[category].append(choice)
       choice = raw_input('Enter another choice (press Enter when finished): ')
    category = raw_input('Enter another category (press Enter when finished): ')
  return mash

def play(mash):
  your_life = {}
  #choose random number
  number = int(math.ceil(random.random()*10)+3)
  all_done = False
  all_cats = mash.keys()
  #make pointer
  pointer = {'current_cat':0,'choice_idx':0}
  counter = number-1 #zerobased indexing system in lists
  while not all_done:
    cc = pointer['current_cat']
    ci = pointer['choice_idx']
    catchoice = mash[all_cats[cc]]
    rem = len(catchoice) - ci
    if counter < rem:
       pointer['choice_idx'] += counter
       mash[all_cats[cc]].pop(pointer['choice_idx'])
       #if current category has 1 choice left, then push it into your_life and pop that cat
       if len(mash[all_cats[cc]])==1:
         your_life[all_cats[cc]] = mash[all_cats[cc]][0]
         del mash[all_cats[cc]]
         all_cats.pop(cc)
         if len(all_cats)!=0:
           pointer['choice_idx'] = 0
           pointer['current_cat'] = moduluz(cc,len(all_cats))
       counter = number - 1
    else: #counter >= rem
       counter -= rem
       pointer['current_cat'] = skip_cat(cc,len(all_cats))
       pointer['choice_idx'] = 0
    all_done = len(mash.keys()) == 0
  return your_life
  

def skip_cat(current_cat, total_cats):
  return (current_cat+1)%total_cats
  
def moduluz(x,y):
  modded = x%y
  if modded<0:
    modded+=y
  return modded
  
mash = inputChoices()
print mash
your_destiny = play(mash)
print your_destiny