// Long-form educational content for each calculator page — kept separate
// from calculatorRegistry.ts (which drives cards/navigation) because this
// is a lot of text purely for SEO and reader education: overview copy,
// the maths behind each tool, practical tips, and a calculator-specific
// FAQ block (also used to emit FAQPage structured data). Every calculator's
// copy is written to stand on its own — different structure and wording,
// not a template with the noun swapped — so pages don't read as duplicate
// content to a search engine.

export interface CalculatorSeoContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  overview: string[];
  howItWorks: { title: string; body: string }[];
  formula: { name: string; expression: string; note: string }[];
  tips: string[];
  faqs: { q: string; a: string }[];
}

export const calculatorContent: Record<string, CalculatorSeoContent> = {
  sip: {
    metaTitle: "SIP Calculator — Calculate Mutual Fund SIP Returns Online",
    metaDescription:
      "Free SIP calculator for Indian investors. Estimate mutual fund SIP returns with step-up SIP, year-by-year growth charts and inflation-adjusted (today's money) value.",
    keywords: [
      "SIP calculator",
      "mutual fund SIP calculator",
      "SIP return calculator",
      "step up SIP calculator",
      "monthly SIP calculator India",
      "SIP calculator with inflation",
      "systematic investment plan calculator",
    ],
    overview: [
      "A Systematic Investment Plan, or SIP, lets you invest a fixed amount in a mutual fund every month instead of putting in one large sum at once. Because the amount and date are fixed, a SIP automatically buys more units when markets are down and fewer when they're up — a habit known as rupee-cost averaging — and it turns investing into a monthly discipline rather than a decision you have to keep making.",
      "This SIP calculator projects how your monthly investment could grow, based on the return rate, tenure and any yearly step-up you enter. It shows the split between the amount you actually invested and the wealth gained purely from compounding, a year-by-year breakdown, and — since a large number decades from now buys less than it sounds like — what that final corpus would be worth in today's money after accounting for inflation.",
    ],
    howItWorks: [
      {
        title: "Enter your monthly investment and expected return",
        body: "Start with how much you can invest each month and a realistic long-term return assumption. Equity mutual funds are commonly modelled at 10–13% p.a. over long periods, though actual returns vary year to year.",
      },
      {
        title: "Set your investment period",
        body: "Longer tenures let compounding do more of the work — the gap between the amount invested and the final corpus widens sharply after year 10–12 in the chart above.",
      },
      {
        title: "Optionally add a step-up and an existing corpus",
        body: "If you expect your income to grow, turn on step-up SIP to increase your monthly instalment by a fixed percentage every year. If you already hold a lump sum elsewhere, add it as your starting corpus so the projection reflects your full picture.",
      },
      {
        title: "Read the today's-money figure",
        body: "The corpus your SIP builds sounds large mostly because it's a future number. The inflation slider converts that final value back into today's purchasing power, so you can judge whether it's actually enough for the goal you have in mind.",
      },
    ],
    formula: [
      {
        name: "SIP future value (annuity due)",
        expression: "FV = P × [ ((1 + i)ⁿ − 1) / i ] × (1 + i)",
        note: "P is the monthly instalment, i is the monthly rate of return (annual rate ÷ 12 ÷ 100), and n is the number of months invested. The final (1 + i) accounts for each instalment typically being invested at the start of the month rather than the end.",
      },
    ],
    tips: [
      "SIP returns are market-linked, not guaranteed — treat any return assumption here as a planning estimate, not a promise.",
      "Starting early matters more than starting big: a smaller SIP begun a few years earlier can out-grow a larger one begun later, purely from extra compounding time.",
      "A step-up SIP that grows with your income can meaningfully shrink the gap between what you can afford today and what a goal will actually cost.",
      "If you're saving toward a specific target — a house, a child's education, retirement — the Goal Planner works backwards from that target to tell you the SIP you need, rather than the other way round.",
      "Before committing to a number, it helps to talk it through with someone who can map it to your actual goals and risk appetite.",
    ],
    faqs: [
      {
        q: "How accurate is this SIP calculator?",
        a: "The maths (compound growth of a monthly instalment) is exact for whatever return rate you enter. What's uncertain is the return itself — real mutual fund returns vary year to year and are never guaranteed, so use this to compare scenarios and build intuition, not as a forecast of your actual future corpus.",
      },
      {
        q: "What is a good SIP amount to start with?",
        a: "There's no universal number — it depends on your income, expenses and goals. Many people start with whatever they can commit to consistently, even a small amount, and increase it over time (see step-up SIP) rather than waiting to start with a large sum.",
      },
      {
        q: "What is step-up SIP and should I use it?",
        a: "A step-up (or top-up) SIP automatically increases your monthly instalment by a fixed percentage each year, so your investment grows in line with your income. It's worth modelling if you expect regular salary increments, since it can substantially raise your final corpus without feeling like a bigger burden today.",
      },
      {
        q: "What return rate should I assume for a mutual fund SIP?",
        a: "This depends on the type of fund. Equity mutual funds are often modelled at roughly 10–13% p.a. over long periods based on historical averages, while debt or hybrid funds are typically assumed lower. Past performance never guarantees future returns, so it's worth testing a few different rates to see how sensitive your goal is to this assumption.",
      },
      {
        q: "Is SIP better than a lumpsum investment?",
        a: "Each suits a different situation — a SIP works well when you're investing out of regular income and want to average out market volatility, while a lumpsum suits a one-time amount like a bonus or maturity payout. Use the Lumpsum Calculator alongside this one, or the Buy vs Invest tool, to compare outcomes for your specific numbers.",
      },
      {
        q: "Why does the calculator show a 'today's money' value alongside the final corpus?",
        a: "A rupee amount 15–20 years from now buys noticeably less than the same amount today because of inflation. Showing both numbers side by side — the nominal corpus and its inflation-adjusted equivalent — gives a more honest sense of what your SIP will actually be worth to you when you need it.",
      },
    ],
  },

  lumpsum: {
    metaTitle: "Lumpsum Investment Calculator — Mutual Fund Lumpsum Returns",
    metaDescription:
      "Calculate how a one-time mutual fund lumpsum investment grows over time. See compounding, doubling time and inflation-adjusted value with a free online calculator.",
    keywords: [
      "lumpsum calculator",
      "mutual fund lumpsum calculator",
      "lumpsum investment calculator",
      "compound interest calculator India",
      "one time investment calculator",
      "doubling time calculator",
    ],
    overview: [
      "A lumpsum investment is a single, one-time amount put into a mutual fund or other instrument — a bonus, a maturity payout, an inheritance, or savings you've built up and are ready to deploy — as opposed to a SIP, where you invest smaller amounts on a schedule. Because the entire amount starts compounding from day one, a lumpsum can grow faster in absolute terms than the same money spread out, but it also carries more exposure to wherever the market happens to be on the day you invest.",
      "This calculator projects how a chosen amount compounds annually at a constant rate of return over your chosen time horizon, showing the split between what you put in and what you gained, how many years it takes to roughly double (the Rule of 72), and what the final figure is worth once inflation is accounted for.",
    ],
    howItWorks: [
      {
        title: "Enter the investment amount",
        body: "This is the single sum you're putting in today — from your savings, a bonus, or the maturity proceeds of another investment.",
      },
      {
        title: "Set an expected annual return",
        body: "Pick a realistic long-term rate for the kind of instrument you're modelling — equity mutual funds are often assumed around 10–13% p.a. over long periods.",
      },
      {
        title: "Choose your investment period",
        body: "The chart shows exactly how the growth curve steepens over time as returns compound on themselves, not just on your original amount.",
      },
      {
        title: "Check the doubling time and today's-money value",
        body: "The doubling-time stat gives a quick, rule-of-thumb sense of how fast your money compounds at that return rate, while the inflation-adjusted figure tells you what the final corpus would be worth in today's terms.",
      },
    ],
    formula: [
      {
        name: "Compound growth",
        expression: "FV = P × (1 + r)ⁿ",
        note: "P is the amount invested, r is the annual rate of return (as a decimal), and n is the number of years — this is standard annual compounding.",
      },
      {
        name: "Rule of 72 (doubling time)",
        expression: "Years to double ≈ 72 ÷ r",
        note: "A quick approximation for how long it takes an investment to roughly double at a given annual return rate — used for the 'doubling time' stat.",
      },
    ],
    tips: [
      "A lumpsum's outcome depends heavily on the market level on the day you invest — some investors reduce this timing risk by moving a lumpsum into equity gradually via an STP (systematic transfer plan) instead of investing it all at once.",
      "Compounding accelerates over time — most of the growth in a long-horizon lumpsum happens in the later years, not the earlier ones, so resist the urge to withdraw early.",
      "Gains from mutual fund lumpsum investments are subject to capital gains tax in India, which varies by fund type and holding period — factor this into your actual take-home returns.",
      "If you're deciding between investing a windfall as a lumpsum or drip-feeding it in over several months, running the same amount through both this calculator and the SIP calculator makes the trade-off concrete.",
    ],
    faqs: [
      {
        q: "Is a lumpsum investment riskier than a SIP?",
        a: "It can be, in the sense that the entire amount is exposed to market levels from day one, whereas a SIP spreads that exposure across many months (rupee-cost averaging). Neither is universally 'better' — it depends on the money's source, your time horizon, and comfort with short-term volatility.",
      },
      {
        q: "How is the doubling time calculated?",
        a: "It uses the Rule of 72 — dividing 72 by your assumed annual return percentage gives an approximate number of years for the investment to double. It's a rough mental-math shortcut, not an exact figure, but it's a useful quick reference.",
      },
      {
        q: "Should I invest a bonus or windfall as a lumpsum all at once?",
        a: "Many investors choose to phase a large lumpsum into equity over a few months (via an STP) to reduce the risk of investing everything right before a market dip, rather than putting it all in on a single day. Whether that's worth doing depends on your specific amount, timeline and risk tolerance — worth discussing with an advisor before deciding.",
      },
      {
        q: "Are mutual fund lumpsum gains taxed in India?",
        a: "Yes — gains are subject to capital gains tax, with the rate and rules depending on whether the fund is equity-oriented or debt-oriented and how long you've held it. This calculator shows gross growth only; consult a tax professional for how tax would affect your actual returns.",
      },
      {
        q: "Lumpsum vs SIP — which should I use for the same amount?",
        a: "If you already have the full amount in hand, compare both: run it as a lumpsum here, and as an equivalent monthly SIP (splitting it over, say, 12 months) in the SIP calculator, to see how the two paths differ for your specific numbers and assumptions.",
      },
    ],
  },

  "goal-planner": {
    metaTitle: "Goal-Based Investment Calculator — Retirement, Education & More",
    metaDescription:
      "Plan for retirement, a child's education, a wedding or any big goal. This calculator works out the inflation-adjusted future cost and the monthly SIP needed to get there.",
    keywords: [
      "goal planning calculator",
      "retirement calculator India",
      "child education planning calculator",
      "financial goal calculator",
      "how much SIP for retirement",
      "inflation adjusted goal calculator",
    ],
    overview: [
      "Most financial goals aren't really about a number today — they're about what that goal will cost by the time you actually need the money, after years of inflation have quietly pushed prices up. A retirement corpus, a child's college fees, or a wedding budget all cost meaningfully more in 10 or 20 years than they do right now, even if nothing about the goal itself changes.",
      "This planner starts from what the goal costs in today's money, inflates it forward to the year you'll need it, and then works backwards to tell you the monthly SIP required to build that inflated amount — accounting for any lump sum you've already set aside toward it. The four presets (retirement, education, home, wedding) are starting points you can adjust to your own numbers.",
    ],
    howItWorks: [
      {
        title: "Set the goal's cost in today's terms",
        body: "Estimate what the goal would cost if you had to pay for it today — a retirement corpus target, current college fees, or today's wedding budget.",
      },
      {
        title: "Choose how many years away it is",
        body: "The further out the goal, the more inflation compounds against you — and the more time your SIP has to grow, which partly offsets that.",
      },
      {
        title: "Set your inflation and expected return assumptions",
        body: "Inflation determines how much the goal's cost grows by the target year; your expected investment return determines how efficiently your monthly SIP builds toward it.",
      },
      {
        title: "Read the required monthly SIP",
        body: "This is the headline number — the monthly investment needed, starting now, to reach the inflated goal amount by your target year, after accounting for any corpus you've already built toward it.",
      },
    ],
    formula: [
      {
        name: "Future cost of the goal",
        expression: "Future Goal = Goal Today × (1 + inflation)ⁿ",
        note: "Projects what today's goal cost will be worth by the target year, given an assumed annual inflation rate over n years.",
      },
      {
        name: "Required monthly SIP",
        expression: "P = (Future Goal − Existing Corpus Grown) ÷ [ ((1 + i)ⁿ − 1) / i × (1 + i) ]",
        note: "The reverse of the SIP future-value formula — solving for the monthly instalment P needed to close the gap between the inflated goal and what your existing corpus will grow to on its own.",
      },
    ],
    tips: [
      "Revisit your goal plan every year or two — actual inflation, your returns, and even the goal itself (school choice, retirement age) can shift enough to change the required SIP meaningfully.",
      "For goals more than a decade away, a higher-growth allocation (like equity mutual funds) is commonly used for the years furthest from the goal, shifting toward safer instruments as the goal approaches — a broad principle worth discussing with an advisor for your specific goal.",
      "Education costs, in particular, have historically run hotter than general consumer inflation in India — consider using a higher inflation assumption specifically for an education goal.",
      "If a goal's required SIP looks unaffordable right now, extending the timeline even by a few years, or starting with a smaller SIP and stepping it up over time, are usually more realistic than assuming a much higher return rate to make the numbers work.",
    ],
    faqs: [
      {
        q: "How much should I save for retirement in India?",
        a: "It depends entirely on your desired post-retirement lifestyle, expected expenses, and how many years you expect retirement to last — there's no single figure that fits everyone. Enter your estimate of today's annual (or total) retirement need as the goal cost, and the calculator will project what that becomes after inflation and tell you the SIP required to build it.",
      },
      {
        q: "How do I plan for my child's education cost with inflation?",
        a: "Education costs tend to rise faster than general inflation in India, so it's worth entering a somewhat higher inflation rate for an education goal than you might use elsewhere. Set the goal cost to today's fees for the course you have in mind, and the number of years until your child would start.",
      },
      {
        q: "How is the required SIP calculated?",
        a: "The calculator first inflates your goal's today's-cost to what it will actually cost in the target year, then works backwards through the standard SIP compounding formula to find the fixed monthly investment that would grow to that inflated amount by then — subtracting out what any existing corpus you've entered will grow to on its own.",
      },
      {
        q: "What inflation rate should I use for goal planning?",
        a: "India's long-term consumer inflation has averaged roughly 5–7% historically, which is a reasonable default for general goals. For goals like education or healthcare, which have often risen faster, a higher assumption (8% or more) is worth testing.",
      },
      {
        q: "Can I plan for more than one goal at once?",
        a: "This calculator handles one goal at a time by design, so the numbers stay clear and specific to that goal. For multiple goals, run each through separately with its own amount, timeline and inflation assumption, then add the required SIPs together.",
      },
    ],
  },

  "home-loan": {
    metaTitle: "Home Loan EMI Calculator — EMI, Prepayment & Amortization Schedule",
    metaDescription:
      "Calculate your home loan EMI, see the full year-by-year amortization schedule, and test how prepayments or a step-up EMI shorten your loan tenure and cut interest.",
    keywords: [
      "home loan EMI calculator",
      "EMI calculator India",
      "home loan calculator with prepayment",
      "loan amortization calculator",
      "step up EMI calculator",
      "housing loan calculator",
    ],
    overview: [
      "A home loan EMI (Equated Monthly Instalment) is a fixed monthly payment that covers both interest and a portion of the principal, calculated so the loan is fully repaid by the end of its tenure using the reducing-balance method — meaning the interest portion is highest in the early years and shrinks as the outstanding balance falls.",
      "This calculator works out your EMI either from a loan amount and tenure, or lets you enter a fixed EMI and see how long it takes to clear the loan. It also models two ways to pay off a loan faster — extra lump-sum EMIs once a year, and a yearly step-up in the EMI itself — and shows exactly how much time and interest each one saves, alongside the full year-by-year amortization schedule.",
    ],
    howItWorks: [
      {
        title: "Choose whether you know your tenure or your EMI",
        body: "If you're planning a new loan, enter the loan amount, rate and desired tenure to see your EMI. If you already have a loan and know your EMI, switch modes to see the resulting tenure instead.",
      },
      {
        title: "Read the payoff date and interest breakdown",
        body: "The headline shows when you'd be loan-free at your current EMI, along with the total interest you'll pay over the life of the loan — often a surprisingly large number on a long-tenure home loan.",
      },
      {
        title: "Test extra payments or a step-up EMI",
        body: "Turn on 'Pay a little extra' to model one or two additional EMI-sized payments a year (from a bonus, for instance), or 'Step up my EMI yearly' to increase your EMI by a fixed percentage each year as your income grows — both are compared against the EMI-only baseline.",
      },
      {
        title: "Check the amortization schedule",
        body: "The year-by-year table breaks down exactly how much of each year's payments goes to principal versus interest, and what the outstanding balance is — including its value in today's money.",
      },
    ],
    formula: [
      {
        name: "EMI (reducing balance method)",
        expression: "EMI = P × r × (1 + r)ⁿ / [ (1 + r)ⁿ − 1 ]",
        note: "P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly instalments (tenure in years × 12).",
      },
    ],
    tips: [
      "A prepayment made early in the loan saves far more interest than the same amount paid later, because more of each early EMI would otherwise have gone toward interest, not principal.",
      "A step-up EMI (raising your EMI a fixed percentage each year) and occasional lump-sum prepayments both shorten the loan, but they affect your cash flow differently — model both to see which fits your income pattern better.",
      "Home loans in India can carry tax benefits on both principal repayment and interest paid, under the relevant sections of the Income Tax Act — the specifics depend on your situation, so this is worth confirming with a tax advisor rather than assuming from a calculator.",
      "A common rule of thumb is keeping your total EMI outgo (across all loans) under roughly 40% of your monthly income, though your comfortable limit depends on your other expenses and financial goals.",
      "If choosing between a fixed and floating rate, remember this calculator assumes a constant rate throughout — a floating-rate loan's actual EMI or tenure will move with market rates over time.",
    ],
    faqs: [
      {
        q: "How is home loan EMI calculated?",
        a: "EMI is calculated using the reducing-balance formula, which spreads the loan principal and interest into equal monthly instalments — the interest portion is largest in the first EMI and gets progressively smaller as the outstanding principal falls, while the principal portion grows each month.",
      },
      {
        q: "Does prepayment reduce my EMI or my loan tenure?",
        a: "Most lenders let you choose. Keeping the EMI the same and reducing tenure saves more total interest, since you get out of the loan (and stop accruing interest) sooner; reducing the EMI instead keeps your monthly outgo lower but saves less interest overall. This calculator's 'extra EMI' and 'step-up' options both model the tenure-reduction approach.",
      },
      {
        q: "What's a good EMI-to-income ratio for a home loan?",
        a: "A commonly used guideline is keeping total EMIs (home loan plus any other loans) under about 40% of monthly take-home income, though lenders and individual financial situations vary. Leaving enough room for other expenses, savings and emergencies matters as much as the ratio itself.",
      },
      {
        q: "Is a step-up EMI better than a lump-sum prepayment?",
        a: "Both reduce your tenure and total interest versus a flat EMI — a step-up raises your fixed monthly outgo gradually in line with expected income growth, while lump-sum prepayments are one-off and depend on having a bonus or windfall available. Try both in the calculator with your actual numbers to see which saves more for your situation.",
      },
      {
        q: "Are there tax benefits on home loan EMIs in India?",
        a: "Home loans can offer deductions on both principal repayment and interest paid under the Income Tax Act, subject to conditions and limits that depend on factors like whether it's a self-occupied property. This calculator focuses on the loan maths only — talk to a tax advisor for how these benefits would apply to you.",
      },
    ],
  },

  "buy-vs-invest": {
    metaTitle: "Buy a Home vs Rent & Invest Calculator — Which Builds More Wealth?",
    metaDescription:
      "Compare buying a home on loan against renting and investing the difference in a SIP. See which path builds more net worth over time, with a fair, like-for-like comparison.",
    keywords: [
      "buy vs rent calculator",
      "home buying vs investing calculator",
      "rent vs buy India",
      "should I buy a house or invest",
      "home loan vs SIP calculator",
    ],
    overview: [
      "Whether it's financially better to buy a home on loan or to rent and invest the difference is one of the most common — and most debated — money questions. Buying builds equity in an appreciating asset but ties up a large down payment and locks in an EMI; renting keeps that down payment free to invest, and can leave you with more to put into a SIP each month, but never builds ownership in the property.",
      "This calculator runs both paths from the same starting point — the same money and the same monthly outflow — so the comparison is genuinely like-for-like. On one side, your home loan is paid off and the property appreciates; on the other, your down payment and the gap between your EMI and rent are invested in a SIP that compounds over the same years. The chart shows exactly when, if ever, one path overtakes the other.",
    ],
    howItWorks: [
      {
        title: "Set the home details",
        body: "Enter the home price, your down payment, the loan's interest rate and tenure, and how fast you expect the property to appreciate each year.",
      },
      {
        title: "Set the investing assumptions",
        body: "Choose an expected SIP return for the invested alternative. Turn on 'Account for rent' for the fair comparison — this way the renting path also pays rent (which grows each year) and only invests what's left over, rather than unrealistically investing the full EMI amount.",
      },
      {
        title: "Read the verdict and crossover point",
        body: "The two headline tiles show your final home equity versus your final SIP corpus after the chosen number of years, including their value in today's money. If the lines cross in the chart, that's the year one path starts pulling ahead of the other.",
      },
    ],
    formula: [
      {
        name: "Home path",
        expression: "Equity(t) = Home Value(t) − Outstanding Loan Balance(t)",
        note: "Home value grows using the appreciation rate you set; the outstanding balance shrinks month by month using the standard EMI amortization schedule.",
      },
      {
        name: "Invest path",
        expression: "SIP corpus grows monthly on (down payment as starting corpus) + (EMI − rent, when accounting for rent)",
        note: "The renting path invests the same down payment as a starting lump sum, then contributes whatever's left of the EMI-equivalent amount after paying (rising) rent each month, compounding at the SIP return you set.",
      },
    ],
    tips: [
      "Toggle 'Account for rent' off to see the (unrealistic but sometimes-quoted) version where the entire EMI is invested — the loan-free comparison you'll often see online skips the fact that a renter still needs somewhere to live.",
      "Home appreciation is one of the most uncertain inputs here — Indian real estate has historically appreciated at roughly 5–8% p.a. over long periods in many markets, but this varies enormously by city and property.",
      "This comparison deliberately leaves out a few real-world factors for clarity: home-loan tax breaks, capital-gains tax on mutual fund withdrawals, maintenance and property tax on the home, and the fact that once a home loan ends, that freed-up EMI could itself be invested. Use the result to see how sensitive the answer is to your assumptions, not as a final verdict.",
      "The 'crossover point' — where investing starts to beat buying, or vice versa — is often more informative than the final-year numbers alone, since it shows how the comparison would look if your actual time horizon is shorter or longer than the tenure you modelled.",
    ],
    faqs: [
      {
        q: "Is buying a home always better than renting and investing?",
        a: "No — it depends heavily on home price appreciation versus investment returns in your specific numbers, your down payment size, local rent levels, and how long you plan to stay. This calculator is built precisely because the answer changes with the inputs; there's no universally correct choice.",
      },
      {
        q: "How does the down payment size affect the comparison?",
        a: "A larger down payment reduces your loan (and total interest paid) on the buying side, but it also means less capital is invested on the renting-and-investing side, since that same down payment would otherwise be a starting lump sum in the SIP. Try a few different down payment percentages to see how much it moves the outcome.",
      },
      {
        q: "What if I don't actually invest the money I save by renting?",
        a: "Then the 'invest' side of this comparison won't play out in reality — the whole case for renting-and-investing depends on genuinely investing the difference every month rather than spending it. If you're not confident you'd stay disciplined about that, buying (which forces savings via the EMI) may suit you better regardless of the raw numbers.",
      },
      {
        q: "Does this calculator include home loan tax benefits or maintenance costs?",
        a: "No — it deliberately keeps the comparison to the core financial mechanics (loan amortization, home appreciation, and SIP compounding) and leaves out home-loan tax deductions, property tax, maintenance, and capital-gains tax on mutual fund withdrawals, since these vary a lot by individual situation. Treat the result as a starting point for the conversation, not the complete picture.",
      },
      {
        q: "How reliable is the home appreciation assumption?",
        a: "It's one of the least predictable inputs in this whole comparison — real estate appreciation varies enormously by city, locality and property type, and past appreciation in one area doesn't guarantee similar returns elsewhere. It's worth testing a conservative, moderate and optimistic appreciation rate to see how much the verdict actually depends on this one number.",
      },
    ],
  },

  inflation: {
    metaTitle: "Inflation Calculator — What Will Your Money Be Worth in the Future?",
    metaDescription:
      "See how inflation erodes purchasing power over time. Calculate what today's expenses will cost in the future, and what a fixed amount will feel like years from now.",
    keywords: [
      "inflation calculator",
      "inflation calculator India",
      "purchasing power calculator",
      "future cost calculator",
      "inflation rate calculator",
      "cost of living calculator",
    ],
    overview: [
      "Inflation is the gradual rise in prices over time, which means the same amount of money buys a little less each year. It's easy to underestimate in day-to-day life because the change from one month to the next is small, but compounded over 10 or 20 years, even a moderate inflation rate meaningfully erodes what your savings can actually buy — which is why any long-term financial plan needs to account for it explicitly, not just the headline growth of an investment.",
      "This calculator shows both directions of that erosion for a chosen amount and time horizon: what today's cost will become in the future at your assumed inflation rate, and — just as importantly — what that same amount of money, held today, will actually be able to buy years from now once prices have risen.",
    ],
    howItWorks: [
      {
        title: "Enter today's amount or cost",
        body: "This can be anything — a monthly expense, a specific purchase you're planning, or a lump sum you're comparing across time. The presets (groceries, school fees, a car, rent) are quick starting points.",
      },
      {
        title: "Set the time horizon and inflation rate",
        body: "India's long-term consumer inflation has averaged roughly 5–7%, though individual categories like education and healthcare have often run hotter than that headline figure — worth using a higher rate for those specifically.",
      },
      {
        title: "Read both sides of the comparison",
        body: "One tile shows what today's cost will become in the future (useful for budgeting a future expense); the other shows what today's amount will still be able to buy by then (useful for judging whether your current savings are keeping pace).",
      },
    ],
    formula: [
      {
        name: "Future cost",
        expression: "Future Amount = Present Amount × (1 + inflation)ⁿ",
        note: "Projects what a present-day cost will become after n years of compounding inflation.",
      },
      {
        name: "Purchasing power lost",
        expression: "Power Lost (%) = 100 × [1 − 1 / (1 + inflation)ⁿ]",
        note: "The percentage of a fixed amount's real buying power that inflation erodes over n years — this is what the 'still buys' figures in the chart and table are built from.",
      },
    ],
    tips: [
      "Inflation isn't uniform across categories — education and healthcare costs in India have often risen faster than the general consumer price index, so it's worth modelling those goals separately with a higher rate.",
      "Money sitting in a low-interest savings account can quietly lose purchasing power if its interest rate is below the inflation rate — this is a key reason long-term savings goals are usually paired with growth-oriented investments, not just a savings account.",
      "When comparing any investment return to inflation, look at the 'real return' — the investment return minus inflation — since that's what actually determines whether your money is growing in terms of what it can buy, not just its numerical value.",
      "Use this calculator alongside the Goal Planner or SIP Calculator: this tool shows why a goal's cost keeps rising, and those tools show how to build toward that rising number.",
    ],
    faqs: [
      {
        q: "What is India's average inflation rate?",
        a: "India's long-term consumer price inflation has averaged roughly 5–7% annually over extended periods, though it fluctuates year to year and varies by category — education and healthcare, for instance, have often run higher than the headline rate. Check current RBI or government inflation data for the most up-to-date figures rather than relying solely on a historical average.",
      },
      {
        q: "How does inflation affect retirement planning?",
        a: "Retirement planning has to account for inflation twice over — once for how much your expenses will have grown by the time you retire, and again for the fact that your retirement itself may last 20–30 years, during which prices keep rising. This is why retirement corpus targets are usually much larger than simply multiplying today's annual expenses by the number of retirement years.",
      },
      {
        q: "What's the difference between inflation and an interest or return rate?",
        a: "Inflation measures how fast prices (and the cost of living) rise; an interest or investment return rate measures how fast your money grows. What matters for your actual financial position is the 'real return' — your investment return minus inflation — since that's what determines whether your money's purchasing power is genuinely increasing or just its face value.",
      },
      {
        q: "How can I protect my savings from inflation?",
        a: "In general, growth-oriented investments that historically outpace inflation over the long term (like equity mutual funds) are one common approach, while money left in low-interest instruments can lose real value over time — but the right mix depends on your time horizon, risk tolerance and goals, and is worth discussing with an advisor rather than applying generically.",
      },
      {
        q: "Is this calculator's inflation rate accurate for every category of expense?",
        a: "No — it applies one constant rate uniformly, which is a simplification. Real-world inflation varies by category (education and healthcare often run hotter than groceries or general goods, for example), so for a specific goal it's worth using a rate tailored to that category rather than a single national average.",
      },
    ],
  },
};

export const calculatorContentBySlug = (slug: string) => calculatorContent[slug];
