import * as React from 'react';
import {useEffect, useState} from 'react';
import 'app/globals.css'
import {getItemById, Item, StringItem, unionOfSetsFromKeys} from "@/data/generic";
import {sortStrategyByTagId, Strategy, useStrategies} from "@/data/strategies";

import {StrategyFormDialog} from "@/components/StrategyFormDialog";
import {SearchBar} from "@/components/SearchBar";
import {TagBar} from "@/components/TagBar";
import SortingSelector from "@/components/SortingSelector";
import {StrategyCard} from "@/components/StrategyCard";
import {useTags} from "@/data/tags";
import {StoryFormDialog} from "@/components/StoryFormDialog";
import {Story} from "@/data/stories";

const dummyTagList = [
  {id: 1, title: 'hello'},
  {id: 2, title: 'goodbye'},
  {id: 3, title: 'there'},
]
interface SortItem extends StringItem {
  sortFunction: (a: Strategy, b: Strategy) => number;
}
const sortOptions: SortItem[] = [
  {
    id: 'newest',
    title: 'Newest',
    sortFunction: (a: Strategy, b: Strategy) => {
      const timeA = new Date(a.created_at).getTime()
      const timeB = new Date(b.created_at).getTime()
      return timeB - timeA
    }
  },
  {
    id: 'popular',
    title: 'Most Popular',
    sortFunction: (a: Strategy, b: Strategy) => {
      // TODO: We may need to rethink our vote data model, and simply package votes with the strategy
      // rather than fetching them separately.
      return 0
    }
  }
]
export default function StrategyPage() {
  const {data: strategies} = useStrategies({onSuccess: () => onSearch('')});
  const {data: fullTagList} = useTags();

  const [modalOpen, setModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<Story|null>(null)
  const [activeStrategyId, setActiveStrategyId] = useState(0)

  const [selectedSortOptionId, setSelectedSortOptionId] = useState(sortOptions[0].id);
  const [filteredStrategies, setFilteredStrategies] = useState<Strategy[]>([]);
  const [sortedStrategies, setSortedStrategies] = useState<Strategy[]>([]);
  const [selectedTags, setSelectedTags] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');


  // Filter the strategies by whether their tags match and whether they match the current search criteria
  useEffect(() => {
    if (!strategies) {
      setFilteredStrategies([])
      return;
    }
    let newFilteredStrategies: Strategy[] = strategies

    if(selectedTags.length > 0) {
      const selectedTagIds = selectedTags.map((tag) => tag.id)
      const bucketedStrategies = sortStrategyByTagId({strategies: strategies})
      newFilteredStrategies = Array.from(unionOfSetsFromKeys({setObject: bucketedStrategies, keys: selectedTagIds}))
    }

    if (searchTerm) {
      newFilteredStrategies = newFilteredStrategies.filter(strategy => {
        return strategy.title?.includes(searchTerm)
      })
    }

    setFilteredStrategies(newFilteredStrategies)
  }, [strategies, setSortedStrategies, selectedTags, searchTerm]);

  // Sort the strategies by the sort option
  useEffect(() => {
    const sortOption = getItemById({items: sortOptions, id:selectedSortOptionId})
    const sortFunction = sortOption?.sortFunction
    if(sortFunction) {
      const newSortedStrategies = filteredStrategies.sort(sortFunction)
      setSortedStrategies(newSortedStrategies)
    }
  }, [sortOptions, selectedSortOptionId, filteredStrategies]);

  function onSortOptionChange(option: string) {
    setSelectedSortOptionId(option)
  }

  function onSearch(searchTerm: string) {
    setSearchTerm(searchTerm)
  }

  function handleNewStoryClick(strategyId: number) {
    setActiveStory(null);
    setStoryModalOpen(true);
  }
  function handleEditStoryClick(story: Story) {
    setStoryModalOpen(true)
    setActiveStory(story)
  }

  const strategyCards = sortedStrategies?.map(strategy => {
    return <StrategyCard
      strategy={strategy}
      onEditStoryClick={handleEditStoryClick}
      onNewStoryClick={handleNewStoryClick}
    />
  })
  const searchSortSection = <div className={'grid gap-y-5'} >
    <SearchBar onSearch={onSearch}/>
    <div className={'flex items-start gap-x-2'}>
      <SortingSelector
        options={sortOptions}
        label={'Sort By'}
        onSortChange={onSortOptionChange}
      />
      <TagBar
        fullList={fullTagList ?? dummyTagList}
        selectedItems={selectedTags}
        setSelectedItems={setSelectedTags}
        label={'Search by Topic, Tag'}
        className={'w-full'}
      />
    </div>
  </div>

  return (
    <div className={'grid mx-auto p-5 gap-y-5 max-w-2xl'}>
      {searchSortSection}
      {strategyCards}
      <StrategyFormDialog
        open={modalOpen}
        setOpen={setModalOpen}
      />
      <StoryFormDialog
        open={storyModalOpen}
        setOpen={setStoryModalOpen}
        story={activeStory}
        setStory={setActiveStory}
        strategyId={activeStrategyId}
      />
    </div>
  );
}

