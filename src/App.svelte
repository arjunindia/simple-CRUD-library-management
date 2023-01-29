<script>
  import "chota";
  import autoAnimate from '@formkit/auto-animate';
  // @ts-ignore
  import { Container, Input, Button, Row, Col,Modal,Card } from "svelte-chota";
  import { onMount } from "svelte";
  import { addBook, editBook, deleteBook } from "./lib/library";
  import { library } from "./lib/store";
  let inputval = {
    isbn: "",
    title: "",
    authorName: "",
    
  };
  let modal_inputval = {
    isbn: "",
    title: "",
    authorName: "",
    
  };
  let error = false;
  let modal_open = false;
  let error_modal = false;
  let modal_index;
</script>

<main>
  <!-- simple crud app shows library management -->
  <Container>
    <Row>
      <Col>
        <h1>Library Management</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Add Book</h2>
      </Col>
    </Row>

    <Row>
      <Col>
        <Input placeholder="ISBN" bind:value={inputval.isbn} required />
      </Col>
      <Col>
        <Input placeholder="Book Name" bind:value={inputval.title} required />
      </Col>
      <Col>
        <Input
          placeholder="Author Name"
          bind:value={inputval.authorName}
          required
        />
      </Col>
      <Col>
        <Button
          on:click={() => {
            if(inputval.isbn.trim() == "" || inputval.title.trim() == "" || inputval.authorName.trim() == "")
              {
                error = true;
                return;
              }
            error = false;
            $library = addBook($library, inputval);
            inputval = { isbn: "", title: "", authorName: "" };
          }}>Submit</Button
        >
      </Col>
    </Row>
    
    {#if error}
    <Row>
      <Col>
        <p class="text-error">Please fill all fields</p>
      </Col>
    </Row>
    {/if}

    <Row>
      <Col>
        <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody use:autoAnimate={{duration:200,easing:"ease-in"}}>
            {#each $library as book, i }
              <tr>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td>
                  <Button on:click={()=>{
                    modal_open = true;
                    modal_index = i;
                    modal_inputval = {isbn:book.isbn,title:book.title,authorName:book.authorName};
                  }} >Edit</Button>
                  
                  <Button
                    on:click={() => {
                      $library = deleteBook($library, i);
                    }}>Delete</Button
                  >
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </Col>
    </Row>

    <Modal bind:open={modal_open}>
      <Card>
        <Row>
          <Col>
            <h3>Edit Book</h3>
          </Col>
        </Row>
        <Row>
          <Col size={12}>
            <Input placeholder="ISBN" bind:value={modal_inputval.isbn} required />
          </Col>
          <Col size={12}>
            <Input placeholder="Book Name" bind:value={modal_inputval.title} required />
          </Col>
          <Col size={12}>
            <Input
              placeholder="Author Name"
              bind:value={modal_inputval.authorName}
              required
            />
          </Col>

      
          <Col>
            <Button
              on:click={() => {
                if(modal_inputval.isbn.trim() == "" || modal_inputval.title.trim() == "" || modal_inputval.authorName.trim() == "")
                  {
                    error_modal = true;
                    return;
                  }
                error_modal = false;
                $library = editBook($library, modal_index, modal_inputval);
                modal_inputval = { isbn: "", title: "", authorName: "" };
                modal_open = false;
              }}>Submit</Button
            >
          </Col>
        </Row>
        {#if error_modal}
        <Row>
          <Col>
            <p class="text-error">Please fill all fields</p>
          </Col>
        </Row>
        {/if}
        <div slot="footer" class="is-right" >
      <Button on:click={() => {modal_open = false;error_modal=false;modal_inputval= { isbn: "", title: "", authorName: "" };}}>Close</Button>
        </div>
      </Card>
    </Modal>
  </Container>
</main>

<style>
</style>
