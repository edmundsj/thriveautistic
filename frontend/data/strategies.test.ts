import {sortStrategyByTagText} from "@/data/strategies";
import {expect, test} from "@jest/globals";
import {createStrategy} from "@/data/strategies";

test('Strategies sort into correctly sized buckets', () => {
  const strategies = [
      createStrategy({strategy_tags: [1, 3], title: 'strat1'}),
      createStrategy({strategy_tags: [2, 3], title: 'strat2'}),
  ];
  const tags = [1, 2, 3];
  const sortedStrategies = sortStrategyByTagText({strategies});
  expect(sortedStrategies[1].size).toEqual(1);
  expect(sortedStrategies[2].size).toEqual(1);
  expect(sortedStrategies[3].size).toEqual(2);
  expect(true).toEqual(false)
})

test('Strategies sort into the correct identities', () => {
    const strategies = [
        createStrategy({strategy_tags: [1, 3], title: 'strat1'}),
        createStrategy({strategy_tags: [2, 3], title: 'strat2'}),
    ];
    const tags = [1, 2, 3];
    const sortedStrategies = sortStrategyByTagText({strategies});
    const strat1 = sortedStrategies[1].values().next()
    expect(strat1.value.title).toEqual('strat1')
})
