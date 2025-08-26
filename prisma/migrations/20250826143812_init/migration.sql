-- CreateEnum
CREATE TYPE "public"."Tech" AS ENUM ('HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'NextJS', 'Vue', 'Nuxt', 'Angular', 'Svelte', 'TailwindCSS', 'Bootstrap', 'Redux', 'Zustand', 'GraphQL', 'Webpack', 'Vite', 'NodeJS', 'Express', 'NestJS', 'Fastify', 'REST', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Prisma', 'TypeORM', 'Docker', 'Redis', 'Kafka', 'RabbitMQ', 'WebSockets', 'JWT');

-- CreateTable
CREATE TABLE "public"."Owner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProjectImage" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TechStack" (
    "id" TEXT NOT NULL,
    "name" "public"."Tech" NOT NULL,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_owner-tech-stacks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_owner-tech-stacks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_project-tech-stacks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_project-tech-stacks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_owner-tech-stacks_B_index" ON "public"."_owner-tech-stacks"("B");

-- CreateIndex
CREATE INDEX "_project-tech-stacks_B_index" ON "public"."_project-tech-stacks"("B");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_owner-tech-stacks" ADD CONSTRAINT "_owner-tech-stacks_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_owner-tech-stacks" ADD CONSTRAINT "_owner-tech-stacks_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_project-tech-stacks" ADD CONSTRAINT "_project-tech-stacks_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_project-tech-stacks" ADD CONSTRAINT "_project-tech-stacks_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."TechStack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
