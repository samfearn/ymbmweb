---
title: "Monte Carlo"
topics: 
  - data
  - experimenting
  - probability
topic_overview: true
related: 
  - statistics
  - circles
author: Prem Raghvani
sub_date: 2026-07-14
header:
  teaser: /assets/img/montecarlo-beanbagvisual.png
  teaser_alt: 25 dots (representing bean bags) randomly placed across a square, with a circle drawn in the square.
  teaser_pos: fit
---

Don't worry - I am not asking your nursery to fork out thousands in tickets to Monaco. Monte Carlo refers to experiments where we use repeated random samples to obtain a numeric result, as we do not necessarily know the answer to everything. One such application is to find a numeric answer for $\pi$ - which we are going to be doing here.

## The Setup

1. Draw a large square on the ground - perhaps using chalk.
2. Draw a circle, such that it fills the square, with the top, bottom, left, and right of the circle touching the sides of the square.
3. Obtain a few bean bags (or something similar that can be thrown but can't roll away) - ideally at least 10.
4. Obtain a volunteer, who must face away from the square and circle (to avoid bias), and throw the bean bags behind them. If it lands outside of the square, please give the volunteer the bean bag back. 
5. Once you have all bean bags in the square, count how many are in the circle. If it lands on the boundary, then get the kids to use their discretion on what should count (one may be able to reason that it should be based on where the middle of the bean bag is, or if the majority of the bean bag lies in the circle). Record this number.
6. Rinse and repeat steps 4 and 5, until you have done (at least 10) rounds. You could change the volunteer for each round (but not within a round).

At the end of step 5, the ground and circle should look something like this, where the red dots represent a bean bag:
{% include figure image_path="/assets/img/montecarlo-beanbagvisual.png" alt="25 dots (representing bean bags) randomly placed across a square, with a circle drawn in the square." %}

Note - if you decide to have more than one of these experiments happening side by side, you could have them record data separately and compare results. It is best comparable if there are the same number of bean bags.

## The Results

At the end, the kids should count the number of times a specified number of beanbags fall in the circle.

With a (simulated) version of 25 bean bags, and 10 rounds, we have:
| Number in Circle | Frequency |
|---------------|-----------------------------|
| 17 |  2 |
| 18 | 2 |
| 19 | 1 |
| 20 | 1 |
| 21 | 3 |
| 22 | 1 |
| **Sum** | 10 |

{% include figure image_path="/assets/img/montecarlo-histogram10.png" alt="The sample data represented in a histogram." %}

Now, we can observe here the most common number is $21$. Though, it may be the case that there is not a single common number, or
if you do $25$ beanbags, it will necessarily be $21$. This is because the results are still random, and we have a small number of samples.

## More Rounds

Now, if you have many more rounds than $10$, say $1000$, then you may end up getting a histogram that looks more beautiful:

{% include figure image_path="/assets/img/montecarlo-histogram1000.png" alt="A simulation of 1000 rounds with 25 beanbags, represented in a histogram." %}

Here, despite the same number of beanbags, this clearly shows the most common number to be $20$ - and by a good margin. You may notice that this (somewhat) resembles a bell curve - as talked about in [the article about dice]({{site.baseulr}}/articles/dice) - and it will resemble it more if we did more simulations, for the same reasons as noted in said article.

## What Should We Have Expected? (Higher Level Mathematics)

In the beginning, I talked about this method giving us a "numeric result" - but, in Maths, we also have an "analytic result". An example of an analytical result may be when you are asked to put an answer in terms of $\pi$, but the numeric result would be to use $\pi = 3.14$.

Now, in this case, we can find the analytic result. Recall that the [area of a circle]({{site.baseulr}}/articles/circles) is:
\begin{equation}
\text{area} = \pi \times \text{radius}^2.
\end{equation}
Say that the radius of the circle is $1$ unit, so the side length of the square is $2$. Then, we know that:
- The area of the circle is $\pi \times (1)^2 = \pi$
- The area of the square is $(2)^2 = 4$
Since the circle is in the square, we can say $\frac{\pi}{4}$ of all bean bags in the square should be in the circle.

Now, because there are $25$ bean bags, we would say we *expect*:
$$25 \times \frac{\pi}{4} \approx 25 \times \frac{3.14}{4} = 19.625$$
bean bags in the circle, given we have $25$ bean bags in the square.

Now, I put an emphasis on *expect* because the random nature means we may have more or less landing in the circle in reality, though if we had many more number of rounds, we would expect the average number of bean bags in the circle for each round to be close to $19.625$.

Here, since we can not have $0.625$ of a bean bag, this means we would expect the most common number to be around $20$ (due to rounding) - which is consistent here!