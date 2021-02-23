const cheerio = require('cheerio');
const got = require('got');

const urlCeniPresidential = 'https://www.ceniniger.org/presidentielle';

let GetRegion = () => {
    return got(urlCeniPresidential).then((result) => {
        const $ = cheerio.load(result.body);

        const regions = [];
        $('#region > option').each((index, element) => {

            const name = $(element).text().trim();
            const id = $(element).attr('value')

            if (id && !isNaN(id)) {
                regions.push({
                    id: id,
                    name: name,
                })
            }
        });
        return regions;
    });
}

let GetDepartmentByRegionId = (regionId) => {
    return got(`${urlCeniPresidential}/?region=${regionId}`).then((result) => {
        const $ = cheerio.load(result.body);

        const regions = [];
        $('option').each((index, element) => {

            const name = $(element).text().trim();
            const id = $(element).attr('value')

            if (id && !isNaN(id)) {
                regions.push({
                    id: id,
                    name: name,
                })
            }
        });
        return regions;
    });
}

let GetTownsByDepartmentId = (departmentId) => {
    return got(`${urlCeniPresidential}/?departement=${departmentId}`).then((result) => {
        const $ = cheerio.load(result.body);

        const regions = [];
        $('option').each((index, element) => {

            const name = $(element).text().trim();
            const id = $(element).attr('value')

            if (id && !isNaN(id)) {
                regions.push({
                    id: id,
                    name: name,
                })
            }
        });
        return regions;
    });
}

let GetVotesByTownId = (townId) => {
    return got(`${urlCeniPresidential}/?communee=${townId}`).then((result) => {
        const $ = cheerio.load(result.body);

        const candidates = [];
        $('#tbody > tr').each((index, element) => {
            const tds = $(element).find('td');
            const id = $(tds[0]).text();
            const name = $(tds[2]).text().trim();
            const vote = $(tds[3]).text();
            if (!isNaN(id)) {
                candidates.push({
                    id: id,
                    name: name,
                    vote: vote
                })
            }
        });
        return candidates;
    });
}

module.exports = {
    GetRegion, GetDepartmentByRegionId, GetTownsByDepartmentId, GetVotesByTownId
};