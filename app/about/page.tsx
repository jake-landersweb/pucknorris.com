import PageHeader from "../../components/pageHeader"

const championships = [
  { year: 2025, label: "Summer Sherwood Silver B Champions" },
  { year: 2023, label: "Winter WSC Div 4 Champions" },
  { year: 2022, label: "Spring Sherwood Silver B Champions" },
  { year: 2018, label: "Spring Sherwood Silver B Champions" },
  { year: 2016, label: "Fall WSC Div 4 Champions" },
  { year: 2016, label: "Spring WSC Div 4 Champions" },
  { year: 2013, label: "Fall WSC Champions" },
  { year: 2013, label: "Winter WSC Champions" },
  { year: 2012, label: "Summer WSC Champions" },
];

const About = () => {
  return (
    <div>
      <PageHeader className="pb-4">
        <h3 className="text-2xl text-gray-400 hover:text-white transition-all hover:underline">
          About Puck Norris
        </h3>
        <p className="max-w-2xl text-gray-500 text-center text-xl">
          Welcome to the PuckNorris.com Beer League hockey team website! We were founded in 2012
          in Portland, Oregon with one goal in mind: to kick some ice and have a blast doing it.
        </p>
      </PageHeader>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-12">

        {/* Story */}
        <p className="text-gray-400 text-lg leading-relaxed">
          Our team consists of a group of dedicated hockey players who share a passion for the
          sport and a love for a cold beer after the game. We come from all walks of life, but on
          the ice, we are one team with one mission. Our slogan is{" "}
          <span className="text-main font-semibold">&ldquo;Blood, Sweat, and Beers&rdquo;</span>.
          We believe that hockey is not just a game; it&apos;s a test of your willpower and
          determination. It&apos;s about working hard, giving it your all, and celebrating your
          victories with a cold one in hand. Throughout the years, we have forged a strong bond
          both on and off the ice. We have faced tough opponents, suffered injuries, and even lost
          a few battles, but through it all, we have never lost our sense of camaraderie and
          friendship.
        </p>

        {/* Championships */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white">Championships</h2>
            <span className="text-main font-bold text-lg">{championships.length}x</span>
          </div>

          <div className="space-y-3">
            {championships.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border border-white/10 rounded-lg px-5 py-4 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
              >
                <span className="text-main font-bold text-xl w-12 shrink-0">{c.year}</span>
                <span className="text-white">{c.label}</span>
                <span className="ml-auto text-yellow-500 text-lg">🏆</span>
              </div>
            ))}
          </div>

          {/* FTF — tucked away where the boys will find it */}
          <p className="text-right text-xs text-white/10 select-none tracking-widest uppercase pr-1">
            FTF
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
