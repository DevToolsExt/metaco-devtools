import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Container } from "@mui/material";
import { Component } from "react";
import CopyTextField from "../components/copyTextField";
import CollapsibleTable from "../components/table";
import {
  addNewHistory,
  clearHistory,
  generateKeyPair,
  getKeyPairHistory,
} from "../controllers/keyManagement";
import { KeyPairSetup } from "../controllers/settings/setup";
import { withNavigation } from "../hoc/withNavigation";
import { maskPrivateKey } from "../utils/strings";

class GenerateKeyPairPage extends Component {
  state: Readonly<{
    isGenerating: boolean;
    newKeyPair: KeyPairSetup;
    copied: boolean;
    history: KeyPairSetup[];
  }> = {
    isGenerating: false,
    newKeyPair: {
      alias: "",
      publicKey: "",
      privateKey: "",
    },
    copied: false,
    history: [
      {
        privateKey: "123",
        publicKey: "123",
        dateCreated: new Date(),
      } as KeyPairSetup,
    ],
  };

  fetchKeyPairHistory = () => {
    const history = getKeyPairHistory();
    this.setState({
      history: history.map((h) => ({
        ...h,
        dateCreated: new Date(h.dateCreated as string),
      })),
    });
  };

  componentDidMount(): void {
    this.fetchKeyPairHistory();
  }

  generateNewKeyPair = async () => {
    this.setState({
      isGenerating: true,
      newKeyPair: {
        ...this.state.newKeyPair,
        publicKey: "",
        privateKey: "",
        dateCreated: undefined,
      },
    });
    const response = await generateKeyPair();
    const { base64PublicKey, privateKey } = response.data;

    const newKeyPair = {
      publicKey: base64PublicKey,
      privateKey,
      dateCreated: new Date(),
      alias: this.state.newKeyPair.alias,
    };

    addNewHistory(newKeyPair);

    this.fetchKeyPairHistory();

    this.setState({
      isGenerating: false,
      newKeyPair,
    });
  };

  copyText = (text: string) => {
    this.setState({
      copied: true,
    });
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 1000);
  };

  render() {
    const {
      newKeyPair: { alias, publicKey, privateKey },
      isGenerating,
      history,
    } = this.state;
    return (
      <Container
        maxWidth='md'
        sx={{
          padding: "5px !important",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}>
        {/* <TextField
          label='Alias'
          onChange={(event) => {
            this.setState({
              ...this.state,
              newKeyPair: {
                ...this.state.newKeyPair,
                alias: event.target.value,
              },
            });
          }}
        /> */}
        {publicKey !== "" && (
          <CopyTextField value={publicKey} label='Public Key' masked={20} />
        )}

        {privateKey !== "" && (
          <CopyTextField
            value={privateKey}
            label='Private Key'
            masked={20}
            valueOverrider={(value: string) => maskPrivateKey(value)}
          />
        )}
        <LoadingButton
          onClick={() => {
            if (this.state.isGenerating) return;
            this.generateNewKeyPair();
          }}
          variant='contained'
          size='medium'
          loading={isGenerating}
          loadingPosition='end'
          fullWidth
          sx={{
            marginTop: 2,
            alignSelf: "flex-end",
          }}>
          {isGenerating ? "Generating" : "Generate"}
        </LoadingButton>
        {Boolean(history.length) && (
          <>
            <Button
              onClick={() => {
                clearHistory();
                this.fetchKeyPairHistory();
              }}
              color='secondary'
              variant='text'
              sx={{
                alignSelf: "flex-end",
              }}>
              Clear History
            </Button>
            <CollapsibleTable data={history} />
          </>
        )}
      </Container>
    );
  }
}

export default withNavigation(GenerateKeyPairPage);
