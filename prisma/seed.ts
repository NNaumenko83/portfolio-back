import { PrismaClient, Tech } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.projectImage.deleteMany();
    await prisma.project.deleteMany();
    await prisma.techStack.deleteMany();
    await prisma.owner.deleteMany();


    const owner = await prisma.owner.create({
        data: {
            name: "Mykola Naumenko",
            email: "nnaumenko83@gmail.com",
            avatarUrl: "https://picsum.photos/seed/owner/200/200",
        },
    });

    const techs = await Promise.all(
        [Tech.React, Tech.NextJS, Tech.NestJS, Tech.PostgreSQL, Tech.Docker].map(
            (t) => prisma.techStack.create({ data: { name: t } })
        )
    );


    await prisma.owner.update({
        where: { id: owner.id },
        data: {
            techStacks: {
                connect: techs.map((t) => ({ id: t.id })),
            },
        },
    });


    for (let i = 1; i <= 3; i++) {
        const project = await prisma.project.create({
            data: {
                ownerId: owner.id,
                title: `Project ${i}`,
                description: `Description for project ${i}`,
                imageUrl: `https://picsum.photos/seed/${i}/400/200`,
                link: `https://example.com/project${i}`,
                techStacks: {
                    connect: techs.map((t) => ({ id: t.id })),
                },
            },
        });

        await Promise.all(
            Array.from({ length: 2 }).map((_, j) =>
                prisma.projectImage.create({
                    data: {
                        projectId: project.id,
                        url: `https://picsum.photos/seed/${i}-${j}/600/400`,
                        description: `Image ${j + 1} for project ${i}`,
                    }
                })
            )
        );
    }

    console.log("✅ Seed done!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
