/** @format */

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
// import ls from 'local-storage';
interface ExperimentProps {
  id: string;
  variants: Array<any>;
  weights?: Array<number>;
}

interface VariantProps {
  experimentId: string;
  variants: Array<any>;
  weights?: Array<number>;
}

const getWeightedRandomInt = (spec: any): number => {
  var i;
  var j;
  var table = [];
  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (j = 0; j < spec[i] * 10; j++) {
      table.push(i);
    }
  }
  return Number(table[Math.floor(Math.random() * table.length)]);
};

// const getVariant = () => {
//   const existingVariant = ls.get('random_variant');
//   if (!existingVariant) {
//     const randomInt = getRandomInt(2);
//     ls.set('random_variant', randomInt);
//     return randomInt === 0 ? 'A' : 'B';
//   } else {
//     return existingVariant === 0 ? 'A' : 'B';
//   }
// };

const useVariant = ({
  experimentId,
  variants,
  weights,
}: VariantProps): {
  Variant: React.FC;
  error: string | null;
} => {
  const [variant, setVariant] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      !variants ||
      variants.length < 2 ||
      (weights && weights.length > 0 && weights.length !== variants.length)
    ) {
      setError(
        'Please make sure to provide at least two variants. If you specify custom weights, you need to do so for each variant.',
      );
    } else if (!variant) {
      try {
        const randomVariant = getWeightedRandomInt(
          variants.reduce((prev, _, crrIndex) => {
            return {
              ...prev,
              [crrIndex]:
                weights && weights.length === variants.length
                  ? weights[crrIndex]
                  : 1 / variants.length,
            };
          }, {}),
        );
        setVariant(randomVariant);
      } catch (err) {
        console.log(err);
      }
    }
  }, [experimentId, variants, error, variant, weights]);

  return {
    error,
    Variant: () => {
      if (variants && typeof variant !== null) {
        return <React.Fragment>{variants[variant!]}</React.Fragment>;
      } else {
        return <React.Fragment />;
      }
    },
  };
};

export const useExperiment = ({ id, variants, weights }: ExperimentProps) => {
  const { Variant } = useVariant({ experimentId: id, variants, weights });

  return { Variant };
};

export const ExampleComponent = () => {
  const { Variant } = useExperiment({
    id: 'test',
    variants: [<div key='1'>Test1</div>, <div key='2'>Test2</div>],
  });
  return (
    <div className={styles.test}>
      <Variant />
    </div>
  );
};
