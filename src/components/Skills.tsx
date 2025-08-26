// src/components/Skills.tsx

import { useEffect, useState } from "react";

type Skill = {
  name: string;
  level: number; // porcentaje 0-100
};

type CardProps = {
  title: string;
  skills: Skill[];
};

function SkillBar({ skill }: { skill: Skill }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(skill.level), 300);
    return () => clearTimeout(timeout);
  }, [skill.level]);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-xl h-3 overflow-hidden">
        <div
          className="h-3 bg-blue-500 rounded-xl transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function SkillCard({ title, skills }: CardProps) {
  return (
    <div className="bg-white/5 shadow-lg rounded-2xl p-6 w-full md:w-1/3">
      <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
      {skills.map((s) => (
        <SkillBar key={s.name} skill={s} />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-6 py-16 bg-slate-950 text-slate-100"
    >
      <h2 className="text-3xl font-bold text-center mb-10">Skills</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Frontend */}
        <SkillCard
          title="Frontend"
          skills={[
            { name: "HTML", level: 95 },
            { name: "CSS", level: 75 },
            { name: "JavaScript", level: 75 },
            { name: "React", level: 85 },
            { name: "Angular", level: 70 },
            { name: "Typescript", level: 70 },
          ]}
        />

        {/* Backend */}
        <SkillCard
          title="Backend"
          skills={[
            { name: "Spring Boot", level: 75 },
            { name: "PHP", level: 85 },
            { name: "Python", level: 95 },
            { name: "Java", level: 90 },
            { name: "MySQL", level: 80 },
            { name: "MariaDB", level: 65 },
            { name: "MongoDB", level: 75 },

          ]}
        />

        {/* Otros */}
        <SkillCard
          title="Otros"
          skills={[
            { name: "Salesforce (Apex, Aura...)", level: 80 },
            { name: "Machine Learning", level: 80 },
            { name: "Docker", level: 60 },
            { name: "Git", level: 80 },
            { name: "C", level: 60 },
          ]}
        />
      </div>
    </section>
  );
}
