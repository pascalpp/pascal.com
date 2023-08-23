<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import Button from '$lib/components/Button.svelte';
  import Column from '$lib/components/Column.svelte';

  const title = 'Modals';
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Column gap="3em">
  <h1>{title}</h1>

  <section>
    <h2>The Modal component shows your content in a modal overlay.</h2>

    <p>Modal does not style the content. It just renders your content and animates it into view.</p>

    <Modal>
      <p slot="trigger" let:open>
        <Button primary on:click={open} label="Open modal" />
      </p>
      <div slot="content" let:close>
        <h3>Unstyled modal</h3>
        <p>This is the content of the modal.</p>
        <p>
          Modal does not style the content. It just renders your content and animates it into view.
        </p>
        <p>
          <Button secondary on:click={close} label="Close modal" />
        </p>
      </div>
    </Modal>
  </section>

  <section>
    <h2>Your component controls the style of the modal content.</h2>

    <p>This modal renders a Card component inside the modal, with a top margin.</p>

    <Modal>
      <p slot="trigger" let:open>
        <Button primary on:click={open} label="Open modal" />
      </p>
      <Card modal slot="content" let:close>
        <Column>
          <h3>Styled modal</h3>
          <p>This modal renders a Card component inside the modal, with a top margin.</p>
          <p><Button secondary on:click={close} label="Close modal" /></p>
        </Column>
      </Card>
    </Modal>
  </section>

  <section>
    <h2>The modal renders a backdrop behind the modal content by default.</h2>

    <p>You can disable this by passing `backdrop=&lbrace;false&rbrace;`.</p>

    <Modal backdrop={false}>
      <p slot="trigger" let:open>
        <Button primary on:click={open} label="Open modal without backdrop" />
      </p>
      <Card modal slot="content" let:close>
        <Column>
          <h3>Modal with no backdrop</h3>
          <p>This modal has no backdrop behind it.</p>
          <p><Button secondary on:click={close} label="Close modal" /></p>
        </Column>
      </Card>
    </Modal>
  </section>

  <section>
    <h2>The modal traps focus while it is open.</h2>
    <p>You can disable this by passing `trapFocus=&lbrace;false&rbrace;`.</p>

    <p>Here is a text input: <input type="text" /></p>
    <Modal>
      <p slot="trigger" let:open>
        <Button primary on:click={open} label="Open modal" />
      </p>
      <Card modal slot="content" let:close>
        <Column>
          <h3>Focus trap</h3>
          <p>As you tab around, focus stays inside the modal, until you close it.</p>
          <p>Here is another text input: <input type="text" /></p>
          <p>
            When you close the modal, focus is returned to the previously focused element (usually,
            the button you clicked to open this modal).
          </p>
          <p>
            <Button secondary on:click={close} label="Close modal" />
          </p>
        </Column>
      </Card>
    </Modal>
  </section>

  <section>
    <h2>The modal blocks scrolling on the body while it is open.</h2>
    <p>Scroll past these paragraphs and click the button.</p>
    <p>
      Mollit voluptate dolore incididunt reprehenderit aliquip pariatur ex. Deserunt do ipsum
      exercitation anim dolor eiusmod excepteur laborum velit esse minim magna reprehenderit. Dolore
      aliqua in ipsum aliquip nulla. Nisi do tempor mollit dolore sint Lorem quis ad elit in.
    </p>
    <p>
      Sit duis deserunt dolore ipsum dolor laborum do. Irure ut elit nisi adipisicing nostrud ad ad
      pariatur in proident irure tempor sit pariatur. Sunt deserunt cupidatat aute reprehenderit
      ullamco deserunt anim.
    </p>
    <p>
      Sint nostrud non veniam et elit sint quis dolor laboris eu nisi enim. Minim quis voluptate
      cillum ex eiusmod culpa dolore tempor. Aute tempor aute consequat occaecat deserunt tempor
      labore dolor qui ut incididunt anim. Nostrud consequat tempor voluptate cupidatat voluptate
      consequat laborum nulla deserunt amet. Quis consectetur laborum ullamco occaecat deserunt
      deserunt Lorem qui velit sit fugiat. Proident esse sit quis velit tempor eiusmod amet occaecat
      sit commodo.
    </p>
    <p>
      Tempor cupidatat sint nulla culpa voluptate. Ad fugiat ullamco nisi anim ipsum dolore occaecat
      labore cillum. Adipisicing aute exercitation consequat reprehenderit tempor mollit ullamco
      culpa reprehenderit amet deserunt sunt. Anim proident culpa exercitation irure cupidatat minim
      incididunt in anim. Ea voluptate reprehenderit exercitation irure nisi aliquip et Lorem ad
      veniam Lorem consectetur. Sunt ipsum in eu consectetur laboris ad aute do excepteur qui.
    </p>
    <p>
      Ex laboris mollit in eu laborum ea nulla ipsum non nulla nostrud laborum deserunt consectetur.
      Elit aliquip ad ullamco ea irure nisi do aute quis voluptate adipisicing ut incididunt amet.
      In ea deserunt tempor ipsum in aute mollit. Commodo sit culpa do elit qui exercitation
      proident consequat ex consectetur Lorem sint aute. Reprehenderit aliquip pariatur Lorem non ut
      sit voluptate nulla. Laborum culpa elit consequat ad nulla ullamco id adipisicing. Pariatur
      non cillum veniam fugiat dolor.
    </p>

    <Modal>
      <p slot="trigger" let:open>
        <Button primary on:click={open} label="Open modal" />
      </p>
      <Card modal slot="content" let:close>
        <Column>
          <h3>Scrolling blocked</h3>
          <p>While the modal is open, the body cannot be scrolled.</p>
          <p>
            <Button secondary on:click={close} label="Close modal" />
          </p>
        </Column>
      </Card>
    </Modal>

    <p>
      Mollit voluptate dolore incididunt reprehenderit aliquip pariatur ex. Deserunt do ipsum
      exercitation anim dolor eiusmod excepteur laborum velit esse minim magna reprehenderit. Dolore
      aliqua in ipsum aliquip nulla. Nisi do tempor mollit dolore sint Lorem quis ad elit in.
    </p>
    <p>
      Sit duis deserunt dolore ipsum dolor laborum do. Irure ut elit nisi adipisicing nostrud ad ad
      pariatur in proident irure tempor sit pariatur. Sunt deserunt cupidatat aute reprehenderit
      ullamco deserunt anim.
    </p>
    <p>
      Sint nostrud non veniam et elit sint quis dolor laboris eu nisi enim. Minim quis voluptate
      cillum ex eiusmod culpa dolore tempor. Aute tempor aute consequat occaecat deserunt tempor
      labore dolor qui ut incididunt anim. Nostrud consequat tempor voluptate cupidatat voluptate
      consequat laborum nulla deserunt amet. Quis consectetur laborum ullamco occaecat deserunt
      deserunt Lorem qui velit sit fugiat. Proident esse sit quis velit tempor eiusmod amet occaecat
      sit commodo.
    </p>
    <p>
      Tempor cupidatat sint nulla culpa voluptate. Ad fugiat ullamco nisi anim ipsum dolore occaecat
      labore cillum. Adipisicing aute exercitation consequat reprehenderit tempor mollit ullamco
      culpa reprehenderit amet deserunt sunt. Anim proident culpa exercitation irure cupidatat minim
      incididunt in anim. Ea voluptate reprehenderit exercitation irure nisi aliquip et Lorem ad
      veniam Lorem consectetur. Sunt ipsum in eu consectetur laboris ad aute do excepteur qui.
    </p>
    <p>
      Ex laboris mollit in eu laborum ea nulla ipsum non nulla nostrud laborum deserunt consectetur.
      Elit aliquip ad ullamco ea irure nisi do aute quis voluptate adipisicing ut incididunt amet.
      In ea deserunt tempor ipsum in aute mollit. Commodo sit culpa do elit qui exercitation
      proident consequat ex consectetur Lorem sint aute. Reprehenderit aliquip pariatur Lorem non ut
      sit voluptate nulla. Laborum culpa elit consequat ad nulla ullamco id adipisicing. Pariatur
      non cillum veniam fugiat dolor.
    </p>
  </section>
  <section>
    <h2>Long modals scroll above the page.</h2>
    <p>Scroll past these paragraphs and click the button.</p>
    <p>
      Tempor cupidatat sint nulla culpa voluptate. Ad fugiat ullamco nisi anim ipsum dolore occaecat
      labore cillum. Adipisicing aute exercitation consequat reprehenderit tempor mollit ullamco
      culpa reprehenderit amet deserunt sunt. Anim proident culpa exercitation irure cupidatat minim
      incididunt in anim. Ea voluptate reprehenderit exercitation irure nisi aliquip et Lorem ad
      veniam Lorem consectetur. Sunt ipsum in eu consectetur laboris ad aute do excepteur qui.
    </p>
    <p>
      Ex laboris mollit in eu laborum ea nulla ipsum non nulla nostrud laborum deserunt consectetur.
      Elit aliquip ad ullamco ea irure nisi do aute quis voluptate adipisicing ut incididunt amet.
      In ea deserunt tempor ipsum in aute mollit. Commodo sit culpa do elit qui exercitation
      proident consequat ex consectetur Lorem sint aute. Reprehenderit aliquip pariatur Lorem non ut
      sit voluptate nulla. Laborum culpa elit consequat ad nulla ullamco id adipisicing. Pariatur
      non cillum veniam fugiat dolor.
    </p>

    <Modal>
      <p slot="trigger" let:open>
        <Button primary on:click={open} label="Open long modal" />
      </p>
      <Card modal slot="content" let:close>
        <Column>
          <h3>Long modal</h3>
          <p>This modal is longer than the page and will scroll above the page.</p>
          <p>
            Laborum proident est officia nisi sint irure in tempor ad consequat nulla est pariatur.
            Labore ea quis fugiat voluptate deserunt nostrud ipsum cupidatat exercitation tempor. Id
            consequat fugiat esse magna qui. Reprehenderit occaecat eu quis magna culpa. Dolore
            magna ut quis eiusmod dolore.
          </p>
          <p>
            Amet anim magna incididunt nisi deserunt Lorem. Nostrud sit pariatur voluptate quis qui
            cillum veniam eiusmod elit exercitation labore minim. Ea amet qui aliquip ex fugiat
            pariatur. Cillum culpa magna occaecat excepteur incididunt excepteur aliqua sint veniam.
            Do do anim eu cupidatat eu occaecat esse nisi adipisicing laborum deserunt veniam et.
          </p>
          <p>
            Consectetur enim ex cillum duis dolor aliqua aute ullamco. Culpa aliquip officia officia
            elit amet. Laborum consectetur velit voluptate laboris occaecat non in Lorem ullamco eu.
          </p>
          <p>
            Id non veniam excepteur ipsum aliquip tempor mollit culpa. Ea Lorem aute non cillum
            voluptate aliqua eiusmod. Culpa ipsum esse consequat veniam voluptate anim fugiat ipsum
            et occaecat excepteur. Aliquip mollit occaecat qui esse nisi. Sint quis cupidatat duis
            ea labore dolor ut ullamco incididunt ullamco magna occaecat veniam nisi. Non enim esse
            incididunt reprehenderit ipsum cupidatat deserunt eu ipsum duis dolore deserunt.
          </p>
          <p>
            Ex ea exercitation proident dolore velit qui officia occaecat magna officia aliqua
            eiusmod consectetur ut. Veniam cillum nostrud et commodo dolore. Sint aute ea irure
            occaecat aute exercitation minim voluptate id.
          </p>
          <p>
            Labore commodo magna dolor culpa esse sint enim exercitation. Culpa sunt ipsum nulla
            incididunt. Duis veniam tempor fugiat ipsum voluptate ad labore. Sint eu eu dolore esse
            aliquip dolore ipsum veniam.
          </p>
          <p>
            Sint irure duis ea commodo. Elit ad ipsum veniam exercitation commodo sint ad minim et
            excepteur cupidatat. Velit deserunt elit dolore excepteur est pariatur qui sint.
            Deserunt culpa tempor voluptate exercitation occaecat quis anim veniam aliqua.
            Reprehenderit anim ut mollit aliqua. Elit nulla mollit adipisicing ullamco eiusmod
            excepteur eu aute. In velit aliqua ut et minim duis nisi proident ad exercitation.
          </p>
          <p>
            <Button secondary on:click={close} label="Close modal" />
          </p>
        </Column>
      </Card>
    </Modal>

    <p>
      Aliquip nulla do exercitation qui id ullamco eu quis. Laborum qui quis ex amet anim ex
      pariatur in excepteur do veniam voluptate est. Adipisicing irure Lorem occaecat ex pariatur
      duis officia aliquip. Veniam veniam proident ut consectetur. Sint cillum elit aliqua dolor
      incididunt occaecat eiusmod quis officia id irure. Anim mollit veniam culpa mollit fugiat sint
      amet.
    </p>
    <p>
      Lorem eiusmod esse consequat dolore enim amet veniam reprehenderit labore sit quis est. Elit
      pariatur tempor minim ipsum culpa laboris exercitation cillum velit aliqua esse quis elit ad.
      Mollit laborum ad sint labore laborum incididunt deserunt nisi non. Eu esse in aliquip
      reprehenderit officia irure eu dolor.
    </p>
  </section>
</Column>

<style lang="less">
  section {
    max-width: 600px;
  }
</style>
