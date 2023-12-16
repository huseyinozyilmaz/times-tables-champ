<template>
  <div class="md:w-3/5 m-auto mt-4 px-3">
    <ClientOnly>
      <img src="~/assets/images/logo-b.svg" alt="logo" class="w-20 md:w-48 m-auto pb-4">
      <h1 class="font-black-ops-one text-center tracking-widest text-lg md:text-2xl uppercase">About Our Times Tables Adventure</h1>

      <section class="md:py-10 flex flex-col justify-center border-b-2">
        <h2 class="text-lg md:text-xl font-bold py-4">🚀 Welcome to our world of multiplication fun! 🚀</h2>
        <p>Hello, fellow math enthusiasts! We're Huseyin and Ahmed, a dynamic duo on a mission to make learning times tables an exciting adventure for young minds. Our journey began when we realised that traditional methods of memorizing multiplication facts were not as thrilling as they could be. So, we decided to embark on a quest to create our very own times tables game!</p>
        <h2 class="text-lg md:text-xl font-bold py-4">💥 The Spark of Creativity</h2>
        <p>It all started one day when Ahmed, our brilliant 7-year-old, expressed a desire to master times tables in a more interactive way. Instead of sticking to dull flashcards and rote memorisation, we put on our thinking caps and brainstormed ideas for a game that would make learning multiplication a joyous experience.</p>
        <h2 class="text-lg md:text-xl font-bold py-4">🎨 The Creative Process</h2>
        <p>Our living room became a brainstorming hub filled with whiteboard, markers, and endless laughter. We experimented with various game concepts, each aimed at making multiplication exciting and rewarding. We wanted our game to not only challenge young minds but also inspire a love for numbers.</p>
        <h2 class="text-lg md:text-xl font-bold py-4">🛠️ Building Blocks of the Game</h2>
        <p>As we delved into game development, Ahmed played a crucial role in deciding the look and feel of the game. From selecting button styles and colors to coming up with scoring logic and badges, every detail was a collaborative effort. We tested prototypes, found some bugs, fine-tuned mechanics, and celebrated small victories along the way.</p>
        <h2 class="text-lg md:text-xl font-bold py-4">✨ The Magic Unveiled</h2>
        <p>And here we are, presenting our creation to you – a game that makes learning times tables fun. Our hope is that children everywhere will find joy in solving multiplication problems, achieving new levels, and mastering the art of numbers.</p>
        <h2 class="text-lg md:text-xl font-bold py-4">🙌 Join Our Adventure!</h2>
        <p>We invite you to join us on this exciting journey of learning and discovery. Whether you're a parent looking for a fun way to reinforce math skills or a young explorer eager to conquer the world of multiplication, our game is designed for you!</p>
        <h2 class="text-lg md:text-xl font-bold py-4">🌟 Thank You for Being a Part of Our Story</h2>
        <p>A heartfelt thank you to everyone who encouraged us, played the early versions, and contributed to the creation of this game. If you find any problems or bugs, please feel free to <a href="https://github.com/huseyinozyilmaz/times-tables-champ/issues/new?title=New+bug+report&body=Describe+the+problem" target="_blank" class="text-blue-800 underline">report it</a> and we'll get it fixed.
          Together, let's make learning math an adventure to remember!</p>
        <p class="py-4">Happy multiplying!</p>
        <p>Huseyin and Ahmed</p>
      </section>

      <h1 class="font-black-ops-one text-center tracking-widest text-2xl uppercase mt-10">Badges</h1>
      <section class="font-black-ops-one text-center">
        <div class="flex justify-center">
          <img src="/resources/badges/LL.webp" alt="logo" class="w-[100px]">
        </div>
        <div class="pb-5">All questions under Level 12 are answered correctly and each answer took less than 2 seconds</div>
        <div class="flex justify-center">
          <img src="/resources/badges/LS.webp" alt="logo" class="w-[100px]">
        </div>
        <div class="pb-5">All questions under Level 12 are answered correctly and each answer took less than 5 seconds</div>
        <div class="flex justify-center">
          <img src="/resources/badges/L11.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L12.webp" alt="logo" class="w-[100px]">
        </div>
        <div class="pb-5">All questions under Level 11 or 12 are answered with no mistake</div>
        <div class="flex justify-center flex-wrap">
          <img src="/resources/badges/L6.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L7.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L8.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L9.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L10.webp" alt="logo" class="w-[100px]">
        </div>
        <div class="pb-5">All questions under any level between 6 and 10 are answered with no mistake</div>
        <div class="flex justify-center flex-wrap">
          <img src="/resources/badges/L1.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L2.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L3.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L4.webp" alt="logo" class="w-[100px]">
          <img src="/resources/badges/L5.webp" alt="logo" class="w-[100px]">
        </div>
        <div class="pb-5">All questions under any level between 1 and 5 are answered with no mistake</div>
      </section>
      <footer class="text-sm opacity-40 text-center py-6">
        <a href="https://www.vecteezy.com/free-vector/badge" target="_blank">Badge Vectors by Vecteezy</a>
      </footer>
    </ClientOnly>
  </div>
</template>