
def inputChoices():
  mash = {'live':['m','a','s','h']}
  category = raw_input('Enter a category (press Enter when finished): ')
  while category != '':
    mash[category] = []
    choice = raw_input('Enter a corresponding choice (press Enter when finished): ')
    while choice != '':
       mash[category].append(choice)
       choice = raw_input('Enter another choice (press Enter when finished): ')
    category = raw_input('Enter another category (press Enter when finished): ')
  return mash

  
#mash = { 'live':['m','a','s','h'], 'car':['toyota','dump truck','jeep','ferrari'], 'num of kidz':['100','3','0','50','1'] }
  
def play(mash, ranNum):
  your_life = {}
  #choose random number
  number = ranNum
  all_done = False
  all_cats = mash.keys()
  #make pointer
  pointer = {'current_cat':0,'choice_idx':0}
  while not all_done:
    counter = number-1 #zerobased indexing system in lists
    cc = pointer['current_cat']
    catchoice = mash[all_cats[cc]]
    ci = pointer['choice_idx']
    #print catchoice
    #if current category has 1 choice left, then push it into your_life and pop that cat
    if len(mash[all_cats[cc]])==1:
      #print 'this cat only had one choice'
      your_life[all_cats[cc]] = mash[all_cats[cc]][0]
      del mash[all_cats[cc]]
      all_cats.pop(cc)
      if len(all_cats)!=0:
        pointer['choice_idx'] = 0
        pointer['current_cat'] = moduluz(cc,len(all_cats))
      #print pointer, all_cats,mash
    else:
      #get pointer.choice_idx, subtract from len(all_cats[cc])
      whats_left = len(mash[all_cats[cc]]) - ci
      #print ('length of current category was' + str(len(mash[all_cats[cc]])) + ' and current indx is ' + str(ci) + 'thus we have ' + str(whats_left) + 'left in this cat')
      if counter < whats_left:
        pointer['choice_idx'] +=counter
      else: #counter == whats_left
        while counter >= whats_left:
          #print counter, 'is greater than ', whats_left
          #print pointer
          counter -= whats_left
          pointer['current_cat'] = skip_cat(cc,len(all_cats))
          cc = pointer['current_cat']
          pointer['choice_idx'] = moduluz(counter,len(mash[all_cats[cc]]))
          ci = pointer['choice_idx']
          #print pointer,' updated'
          whats_left = len(mash[all_cats[cc]])
      #print pointer
      catchoice = mash[all_cats[cc]]
      catchoice.pop(ci)
      #print mash
    all_done = len(mash.keys()) == 0
  print your_life
  return your_life
  

def skip_cat(current_cat, total_cats):
  return (current_cat+1)%total_cats
  
def moduluz(x,y):
  modded = x%y
  if modded<0:
    modded+=y
  return modded
  
mash = inputChoices()
#play(mash,5)
play(mash,4)
#play(mash,1)
#play(mash,100)