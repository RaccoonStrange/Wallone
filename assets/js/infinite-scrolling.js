// // Это объект поста, которые мы будем отдавать
// // в качестве новой порции контента.
//
// const post = {
//     title: "Заголовок поста",
//     body:
//         "Текст поста в лучшей на свете социальной сети Switter. Все совпадения вымышлены и случайны.",
//     likes: 77,
//     reposts: 7,
// }
//
// const server = {
//     // Аргумент page — курсор, номер страницы, которую надо загрузить.
//     // С этим номером мы определяем, какую порцию контента отправить.
//     // В нашем примере порции отличаться не будут, но в жизни
//     // курсор бы влиял на то, какой диапазон постов сервер бы доставал из БД.
//     posts(page = 1) {
//         // В нашем случае, если текущая страница — 5-я,
//         // мы считаем, что контент закончился.
//         const finished = page >= 5
//
//         // Иначе сервер отправляет курсор next.
//         // Он указывает, какая страница будет по счёту следующей.
//         // Так клиент будет знать, стоит ли ему отправлять запрос
//         // за новой порцией контента.
//         const next = finished ? null : page + 1
//
//         // В качестве постов отправляем массив из 5 объектов post.
//         const posts = Array(5).fill(post)
//
//         return new Promise((resolve) => {
//             // Таймаут имитирует сетевую «задержку».
//             setTimeout(() => {
//                 resolve({ posts, next })
//             }, 150)
//         })
//     },
// }
// const response = await server.posts()
//
// // Метод posts возвращает Promise, имитируя асинхронное общение
// // между клиентом и сервером («запрос/ответ»).
//
// function checkPosition() {
//     // Нам потребуется знать высоту документа и высоту экрана:
//     const height = document.body.offsetHeight
//     const screenHeight = window.innerHeight
//
//     // Они могут отличаться: если на странице много контента,
//     // высота документа будет больше высоты экрана (отсюда и скролл).
//
//     // Записываем, сколько пикселей пользователь уже проскроллил:
//     const scrolled = window.scrollY
//
//     // Обозначим порог, по приближении к которому
//     // будем вызывать какое-то действие.
//     // В нашем случае — четверть экрана до конца страницы:
//     const threshold = height - screenHeight / 4
//
//     // Отслеживаем, где находится низ экрана относительно страницы:
//     const position = scrolled + screenHeight
//
//     // Так как fetchPosts асинхронная,
//     // checkPosition тоже станет асинхронной:
//     async function checkPosition() {
//         // ...Старый код.
//
//         if (position >= threshold) {
//             // Используем fetchPosts:
//             await fetchPosts()
//         }
//     }
//
//     // Какая страница следующая:
//     let nextPage = 2
//
//     // Если отправили запрос, но ещё не получили ответ,
//     // не нужно отправлять ещё один запрос:
//     let isLoading = false
//
//     // Если контент закончился, вообще больше не нужно
//     // отправлять никаких запросов:
//     let shouldLoad = true
//
//     async function fetchPosts() {
//         // Если мы уже отправили запрос, или новый контент закончился,
//         // то новый запрос отправлять не надо:
//         if (isLoading || !shouldLoad) return
//
//         // Предотвращаем новые запросы, пока не закончится этот:
//         isLoading = true
//
//         const { posts, next } = await server.posts(nextPage)
//         posts.forEach(appendPost)
//
//         // В следующий раз запрашиваем страницу с номером next:
//         nextPage = next
//
//         // Если мы увидели, что контент закончился,
//         // отмечаем, что больше запрашивать ничего не надо:
//         if (!next) shouldLoad = false
//
//         // Когда запрос выполнен и обработан,
//         // снимаем флаг isLoading:
//         isLoading = false
//     }
//
//     function throttle(callee, timeout) {
//         let timer = null
//
//         return function perform(...args) {
//             if (timer) return
//
//             timer = setTimeout(() => {
//                 callee(...args)
//
//                 clearTimeout(timer)
//                 timer = null
//             }, timeout)
//         }
//     }
//
// // И теперь назначим обработчиком событий
// // слегка приторможенную функцию:
//     ;(() => {
//         window.addEventListener("scroll", throttle(checkPosition, 250))
//         window.addEventListener("resize", throttle(checkPosition, 250))
//     })()
// }
//
// // Добавим функцию throttle:
//
//
// function appendPost(postData) {
//     // Если данных нет, ничего не делаем:
//     if (!postData) return
//
//     // Храним ссылку на элемент, внутрь которого
//     // добавим новые элементы-свиты:
//     const main = document.querySelector("main")
//
//     // Используем функцию composePost,
//     // которую напишем чуть позже —
//     // она превращает данные в HTML-элемент:
//     const postNode = composePost(postData)
//
//     // Добавляем созданный элемент в main:
//     main.append(postNode)
//
//     function composePost(postData) {
//         // Если ничего не передано, ничего не возвращаем:
//         if (!postData) return
//
//         // Обращаемся к шаблону, который создали ранее:
//         const template = document.getElementById("post_template")
//
//         // ...и вытаскиваем его содержимое.
//         // В нашем случае содержимым будет «скелет» свита, элемент article.
//         // Указываем, что нам необходимо его склонировать, а не использовать сам элемент,
//         // иначе он изменится сам, и мы не сможем сделать несколько свитов:
//         const post = template.content.cloneNode(true)
//
//         // Из postData получаем всю необходимую информацию:
//         const { title, body, likes, reposts } = postData
//
//         // Добавляем соответствующие тексты и числа в нужные места в «скелете»:
//         post.querySelector("h1").innerText = title
//         post.querySelector("p").innerText = body
//         post.querySelector("button:first-child").innerText += likes
//         post.querySelector("button:last-child").innerText += reposts
//
//         // Возвращаем созданный элемент,
//         // чтобы его можно было добавить на страницу:
//         return post
//     }
// }
//
//
