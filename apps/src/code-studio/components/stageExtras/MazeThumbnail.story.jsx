import React from 'react';
import MazeThumbnail from './MazeThumbnail';

const sampleMap = [
  [0, 0, 0, 4, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 2, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 4],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 3, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const collectorMap = [
  [{"tileType":0},{"tileType":0},{"tileType":0},{"tileType":0},
    {"tileType":0},{"tileType":0},{"tileType":0},{"tileType":0}],
  [{"tileType":0},{"tileType":0},{"tileType":0},{"tileType":0},
    {"tileType":0},{"tileType":0},{"tileType":0},{"tileType":0}],
  [{"tileType":0},{"tileType":1},{"tileType":1,"value":1,"range":1},{"tileType":1},
    {"tileType":1,"value":2,"range":2},{"tileType":1},{"tileType":0},{"tileType":0}],
  [{"tileType":0},{"tileType":1,"value":4,"range":4},{"tileType":0},{"tileType":1},
    {"tileType":0},{"tileType":1,"value":3,"range":3},{"tileType":0},{"tileType":0}],
  [{"tileType":0},{"tileType":1},{"tileType":1},{"tileType":2},
    {"tileType":1},{"tileType":1},{"tileType":0},{"tileType":0}],
  [{"tileType":0},{"tileType":1,"value":3,"range":3},{"tileType":0},{"tileType":1},
    {"tileType":0},{"tileType":1,"value":1,"range":1},{"tileType":0},{"tileType":0}],
  [{"tileType":0},{"tileType":1},{"tileType":1,"value":2,"range":2},{"tileType":1},
    {"tileType":1,"value":4,"range":4},{"tileType":1},{"tileType":0},{"tileType":0}],
  [{"tileType":0},{"tileType":0},{"tileType":0},{"tileType":0},
    {"tileType":0},{"tileType":0},{"tileType":0},{"tileType":0}]
];

export default storybook => {
  storybook
    .storiesOf('MazeThumbnail', module)
    .addStoryTable([{
      name: 'Angry Birds',
      description: 'This is the MazeThumbnail component.',
      story: () => (
        <MazeThumbnail
          map={sampleMap}
          level={{
            startDirection: 1,
          }}
          skin="birds"
        />
      ),
    }, {
      name: 'Plants vs. Zombies',
      description: 'This is the MazeThumbnail component.',
      story: () => (
        <MazeThumbnail
          map={sampleMap}
          level={{
            startDirection: 1,
          }}
          skin="pvz"
        />
      ),
    }, {
      name: 'Scrat',
      description: 'This is the MazeThumbnail component.',
      story: () => (
        <MazeThumbnail
          map={sampleMap}
          level={{
            startDirection: 1,
          }}
          skin="scrat"
        />
      ),
    }, {
      name: 'Bee',
      description: 'This is the MazeThumbnail component.',
      story: () => (
        <MazeThumbnail
          map={sampleMap}
          level={{
            startDirection: 1,
            flowerType: 'redWithNectar',
          }}
          skin="bee"
        />
      ),
    }, {
      name: 'Farmer',
      description: 'This is the MazeThumbnail component.',
      story: () => (
        <MazeThumbnail
          map={sampleMap}
          level={{
            startDirection: 1,
          }}
          skin="farmer"
        />
      ),
    }, {
      name: 'Farmer Night',
      description: 'This is the MazeThumbnail component.',
      story: () => (
        <MazeThumbnail
          map={sampleMap}
          level={{
            startDirection: 1,
          }}
          skin="farmer_night"
        />
      ),
    }, {
      name: 'Collector',
      description: 'This is the MazeThumbnail component.',
      story: () => (
        <MazeThumbnail
          serializedMaze={collectorMap}
          level={{
            startDirection: 1,
          }}
          skin="collector"
        />
      ),
    }]);
};
