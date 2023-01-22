# [zkalc](https://zka.lc) is a cryptographic calculator!

[zkalc](https://zka.lc) helps you calculate how much time cryptographic operations take on a real computer


## Why?

Cryptographers tend to be good at cryptography but they can be quite bad at estimating the time it takes a computer to run their schemes.

We hope that zkalc can help shorten the gap between cryptography and practice:
- Cryptographers can use the simple zkalc UX to learn how fast their paper will run on various machines
- Protocol designers can more easily tune the parameters of their protocol depending on their requirements

Please see the various pages of [the website](https://zka.lc) for more information on how zkalc works.

## Run new benchmarks

All benchmarks are listed and run inside the `benchmarks/` folder.
To run benchmarks, we assume that `make`, `git`, and `cargo` are available in the system. Simply run:

```bash
    $ cd backend
    $ make
```
The files generated will end up stored in `perf/data/new/`

## Process benchmark outputs

The produced benchmarks are then post-processed in a simpler and uniform json format.
For this step, we require `python3`. In order to generate data accordingly, run:

```bash
    $ python3 fit.py < json > output.json
```

## Fronted development
To develop the frontend, `npm` is required.
Run:

```bash
    $ npm i
    $ npm run dev
```

To start a local development server

