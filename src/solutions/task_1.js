// Please implement your solution in this file

export const prepareData = ({year, customerName}) => (data) =>
  data?.reduceRight((acc, cur) => {
    if (cur.launch_year === String(year)) {
      let includesCustomer = false;
      const payloads = [...cur.rocket?.second_stage?.payloads];
      const isCustomerInList = (customers) => customers.find(customer => customer.includes(customerName));

      for (let i = 0; i < payloads.length; i++) {
        if (isCustomerInList(payloads[i].customers)) {
          includesCustomer = true
          break
        }
      }

      if (includesCustomer) {
        const newRecord = {
          flight_number: cur.flight_number,
          mission_name: cur.mission_name,
          payloads_count: payloads.length
        };

        if (newRecord.payloads_count === 1) {
          return [...acc, newRecord]
        } else {
          for (let i = 0; i < acc.length; i++) {
            if (newRecord.payloads_count > acc[i].payloads_count) {

              acc.splice(i, 0, newRecord)
              break
            }
          }

          return acc
        }
      }
    }

    return acc
  }, [])
